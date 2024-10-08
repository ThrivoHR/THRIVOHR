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
import { CirclePlus, Eye, EyeOff } from "lucide-react";
import LoadingAnimate from "@/components/Loading";
import Image from "next/image";
import none from "/public/nothing-here-.jpg";

export default function Contract() {
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState<ContractSchemaType[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<ContractFilterType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<ContractSchemaType | null>(null);
  const [contractData, setContractData] = useState<UpdateContractType | null>(null);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [departments, setDepartments] = useState<{ [key: number]: string }>({});
  const [positions, setPositions] = useState<{ [key: number]: string }>({});
  const [showTable, setShowTable] = useState(false); // Table visibility state

  const handleFilterChange = (newFilter: ContractFilterType) => {
    setFilter(newFilter);
    setPage(1);
    setShowTable(true); // Show table when filter is applied
  };

  const handleDelete = (contract: ContractSchemaType) => {
    setSelectedContract(contract);
    setDialogOpen(true);
  };

  const fetchData = async (filterParam: ContractFilterType | null) => {
    setLoading(true);
    try {
      const [contractData, departmentData, positionData] = await Promise.all([
        apiContractRequest.getListContract(page, pageSize, filterParam),
        apiDepartmentRequest.getDepartment(),
        apiPositionRequest.getPosition(),
      ]);
      setContract(contractData.payload.value.data);
      console.log("Fetched contracts:", contractData.payload.value.data);
      setDepartments(departmentData.payload.value);
      setPositions(positionData.payload.value);
    } catch (error) {
      console.error("Error fetching data:", error);
      setContract([]);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (selectedContract) {
      try {
        const contractCodeString = selectedContract.id.toString();
        await apiContractRequest.deleteContract(contractCodeString, contractCodeString);
        setContract((prev) => prev.filter((c) => c.id !== contractCodeString));
        await fetchData(filter);
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
        salary: Number(contract.salary),
        departmentId: getDepartmentId(contract.department),
        positionId: getPositionId(contract.position),
      },
    });
    setEditModalOpen(true);
    fetchData(filter);
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
        await fetchData(filter);
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
    if (showTable) {
      fetchData(filter); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, showTable,filter]); 

  return (
    <div>
      <ContractFilter onFilter={handleFilterChange} />
      <div className="flex justify-end items-center py-3 space-x-2">
        <Button onClick={openModal}><CirclePlus size={16} />&nbsp;Add</Button>
        <Button variant="secondary" onClick={() => setShowTable((prev) => !prev)}>
          {showTable ? <div className="flex items-center"
          ><EyeOff size={20}/>&nbsp; Hide Table</div> : <div className="flex items-center"><Eye size={20}/>&nbsp; Show Table</div>}
        </Button>
      </div>
      <AddContractModal isOpen={isModalOpen} onClose={closeModal} />

      {showTable ? (
        <>
          {loading ? (
            <div>
              <LoadingAnimate />
            </div>
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
              <div>No contracts found.</div>
            )}
            </>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center flex-col">
          <Image src={none} alt="nothing" width={400} height={300}/>
          <p>Nothing here, start by pressing Show Table button above</p>
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
              <AlertDialogAction onClick={handleEndContract}>End</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
