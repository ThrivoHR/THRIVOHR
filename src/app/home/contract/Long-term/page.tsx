"use client";

import React, { useEffect, useState } from "react";
import apiContractRequest from "@/apiRequest/contract";
import {
  ContractFilterType,
  ContractSchemaType,
  UpdateContractType,
} from "@/schemaValidation/contract.schema";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ContractFilter from "./filterContract";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EditContractModal } from "./editContract";

export default function Contract() {
  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState<ContractSchemaType[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<ContractFilterType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] =
    useState<ContractSchemaType | null>(null);
  const [contractData, setContractData] = useState<UpdateContractType | null>(
    null
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleFilterChange = (newFilter: ContractFilterType) => {
    setFilter(newFilter);
    setPage(1); // Reset to page 1 when filters change
  };

  const handleDelete = (contract: ContractSchemaType) => {
    setSelectedContract(contract);
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedContract) {
      try {
        const contractCodeString = selectedContract.id.toString();
        await apiContractRequest.deleteContract(
          contractCodeString,
          contractCodeString
        );
        setContract((prev) => prev.filter((c) => c.id !== contractCodeString));
        console.log("Deleted contract:", contractCodeString);
      } catch (error) {
        console.error("Error deleting contract:", error);
      } finally {
        setDialogOpen(false);
        setSelectedContract(null);
      }
    }
  };

  const defaultDepartmentId = 0;
  const defaultPositionId = 0;

  const departmentMap: { [key: string]: number } = {
    Admin: 1,
    IT: 2,
    Sale: 3,
    Accounting: 4,
    Marketing: 5,
  };

  const positionMap: { [key: string]: number } = {
    Manager: 1,
    Admin: 2,
    Intern: 3,
    Staff: 4,
    Supervisor: 5,
  };

  const getDepartmentId = (
    departmentName: string | undefined
  ): number | undefined => {
    return departmentMap[departmentName ?? ""] ?? defaultDepartmentId;
  };

  const getPositionId = (
    positionName: string | undefined
  ): number | undefined => {
    return positionMap[positionName ?? ""] ?? defaultPositionId;
  };

  const handleEdit = (contract: ContractSchemaType) => {
    const departmentId = getDepartmentId(contract.department);
    const positionId = getPositionId(contract.position);
    setContractData({
      employeeContractModel: {
        contractId: contract.id,
        startDate: contract.startDate,
        endDate: contract.endDate,
        notes: contract.notes,
        salary: contract.salary,
        departmentId: departmentId ?? defaultDepartmentId,
        positionId: positionId ?? defaultPositionId,
      },
    });
    setEditModalOpen(true);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  useEffect(() => {
    const fetchContract = async () => {
      setLoading(true);
      try {
        const data = await apiContractRequest.getListContract(
          page,
          pageSize,
          filter
        );
        console.log(data.payload.value.data);
        setContract(data.payload.value.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [page, pageSize, filter]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ContractFilter onFilter={handleFilterChange} />
      <DataTable columns={columns(handleDelete, handleEdit)} data={contract} />
      <div className="flex justify-between items-center p-4">
        <div>
          <select
            value={pageSize}
            onChange={(e) => handleChangePageSize(Number(e.target.value))}
            className="px-4 py-2 border rounded-lg"
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => handleChangePage(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-lg"
          >
            Previous
          </button>
          <span className="mx-4">Page {page}</span>
          <button
            onClick={() => handleChangePage(page + 1)}
            className="px-4 py-2 border rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the contract? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {contractData && (
        <EditContractModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          contractData={contractData}
          contractId={contractData.employeeContractModel.contractId}
        />
      )}
    </div>
  );
}
