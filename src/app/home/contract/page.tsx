"use client";

import React, { useEffect, useState } from "react";
import apiContractRequest from "@/apiRequest/contract";
import apiDepartmentRequest from "@/apiRequest/department";
import apiPositionRequest from "@/apiRequest/position";
import {
  ContractFilterType,
  ContractSchemaType,
  UpdateContractType,
} from "@/schemaValidation/contract.schema";
import { DataTable } from "./data-table";
import { Columns } from "./columns";
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
import { AddContractModal } from "./addContract";
import { Button } from "@/components/ui/button";

export default function Contract() {
  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState<ContractSchemaType[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<ContractFilterType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<ContractSchemaType | null>(null);
  const [contractData, setContractData] = useState<UpdateContractType | null>(null);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [departments, setDepartments] = useState<{ [key: number]: string }>({});
  const [positions, setPositions] = useState<{ [key: number]: string }>({});

  const handleFilterChange = (newFilter: ContractFilterType) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handleDelete = (contract: ContractSchemaType) => {
    setSelectedContract(contract);
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedContract) {
      try {
        const contractCodeString = selectedContract.id.toString();
        await apiContractRequest.deleteContract(contractCodeString, contractCodeString);
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

  const handleEdit = (contract: ContractSchemaType) => {
    setContractData({
      employeeContractModel: {
        contractId: contract.id,
        startDate: contract.startDate,
        endDate: contract.endDate,
        notes: contract.notes,
        salary: contract.salary,
        departmentId: getDepartmentId(contract.department),
        positionId: getPositionId(contract.position),
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

  const handleOpenModal = (contract: ContractSchemaType) => {
    setSelectedContract(contract);
    setIsEndModalOpen(true);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEndContract = async () => {
    if (selectedContract) {
      try {
        await apiContractRequest.endContract(selectedContract.id, selectedContract.id);
        console.log("Contract ended successfully");
        setIsEndModalOpen(false);
        setSelectedContract(null);
      } catch (error) {
        console.error("Error ending contract:", error);
      }
    }
  };

  const getDepartmentId = (departmentName: string | undefined): number => {
    const entry = Object.entries(departments).find(([, name]) => name === departmentName);
    return entry ? parseInt(entry[0]) : 0;
  };

  const getPositionId = (positionName: string | undefined): number => {
    const entry = Object.entries(positions).find(([, name]) => name === positionName);
    return entry ? parseInt(entry[0]) : 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (filter) {
        setLoading(true);
        try {
          const [contractData, departmentData, positionData] = await Promise.all([
            apiContractRequest.getListContract(page, pageSize, filter),
            apiDepartmentRequest.getDepartment(),
            apiPositionRequest.getPosition(),
          ]);
          setContract(contractData.payload.value.data);
          setDepartments(departmentData.payload.value);
          setPositions(positionData.payload.value);
        } catch (error) {
          console.error("Error fetching data:", error);
          setContract([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [page, pageSize, filter]);


  return (
    <div>
      <ContractFilter onFilter={handleFilterChange} />
      <div className="flex justify-end items-center py-3 space-x-2">
        <Button onClick={openModal}>Add new contract</Button>
      </div>
      <AddContractModal isOpen={isModalOpen} onClose={closeModal} />

      {filter ? (
        <>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {contract.length > 0 ? (
                <>
                  <DataTable columns={Columns(handleDelete, handleEdit, handleOpenModal)} data={contract} />
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
                        className="px-4 py-2 border rounded-lg text-sm"
                      >
                        Previous
                      </button>
                      <span className="mx-4">Page {page}</span>
                      <button
                        onClick={() => handleChangePage(page + 1)}
                        className="px-4 py-2 border rounded-lg text-sm"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div>No contracts found for the selected filter.</div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="p-4 text-center">
          <p>Try to search something using the filter.</p>
        </div>
      )}
      
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

      {selectedContract && (
        <AlertDialog open={isEndModalOpen} onOpenChange={setIsEndModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>End Contract</AlertDialogTitle>
            </AlertDialogHeader>
            <p>Are you sure you want to end this contract?</p>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsEndModalOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleEndContract}>
                End Contract
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}