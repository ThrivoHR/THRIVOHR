"use client";

import React, { useEffect, useState } from "react";
import apiContractRequest from "@/apiRequest/contract";
// import apiDepartmentRequest from "@/apiRequest/department";
// import apiPositionRequest from "@/apiRequest/position";
import {
  ContractFilterType,
  ContractSchemaType,
  UpdateContractType,
} from "@/schemaValidation/contract.schema";
import { DataTable } from "./data-table";
import { Columns } from "./columns";
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

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import LoadingAnimate from "@/components/Loading";
import apiApplicationFormRequest from "@/apiRequest/applicationForm";
import { ApplicationFormFilterType, ApplicationFormSchemaType, UpdateStatusType } from "@/schemaValidation/applicationForm.schema";
import { AddApplicationFormModal } from "./addApplicationForm";
import ApplicationFormFilter from "./filterApplicationForm";

export default function Contract() {
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<ApplicationFormSchemaType[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<ApplicationFormFilterType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<UpdateStatusType | null>(null);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  // const [departments, setDepartments] = useState<{ [key: number]: string }>({});
  // const [positions, setPositions] = useState<{ [key: number]: string }>({});
  const [showTable, setShowTable] = useState(false); // Table visibility state

  const handleFilterChange = (newFilter: ApplicationFormFilterType) => {
    setFilter(newFilter);
    setPage(1);
    fetchData(newFilter); 
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleOpenModal = (applicationForm: UpdateStatusType) => {
    setSelectedApplication(applicationForm);
    setIsEndModalOpen(true);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getStatusNumber = (status: string): number => {
    switch (status) {
      case "Pending":
        return 0;
      case "Approved":
        return 1;
      case "Rejected":
        return 2;
      default:
        return -1;
    }
  };

  const fetchData = async (filter: ApplicationFormFilterType | null) => {
    setLoading(true);
    try {
      const [data] = await Promise.all([
        apiApplicationFormRequest.getApplicationForm(page, pageSize, filter),
      ]);
      setApplication(data.payload.value.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setApplication([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (selectedRowData: ApplicationFormSchemaType) => {
    setLoading(true);
    try {
      const statusNumber = getStatusNumber(selectedRowData.status); // Convert status string to number
      if (statusNumber === -1) {
        console.error("Invalid status value:", selectedRowData.status);
        return;
      }
      const response = await apiApplicationFormRequest.updateApplicationFormStatus(
        selectedRowData.id,
        statusNumber 
      );
      if (response.payload) {
        console.log("Status updated successfully:", response);
        fetchData(filter); // Refresh the table
      } else {
        console.error("Failed to update status:");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (showTable) {
      fetchData(filter); 
    }
  }, [page, pageSize, showTable]); 

  return (
    <div>
      <ApplicationFormFilter onFilter={handleFilterChange} />
      <div className="flex justify-end items-center py-3 space-x-2">
        <Button onClick={openModal}>Add new application</Button>

        <Button variant="secondary" onClick={() => setShowTable((prev) => !prev)}>
          {showTable ? <div className="flex items-center"
          ><EyeOff size={20}/>&nbsp; Hide Table</div> : <div className="flex items-center"><Eye size={20}/>&nbsp; Show Table</div>}
        </Button>
      </div>
      <AddApplicationFormModal isOpen={isModalOpen} onClose={closeModal} />

      {loading ? (
        <div><LoadingAnimate/></div>
      ) : (
        showTable && (
          <>
            {application.length > 0 ? (
              <>
                <DataTable columns={Columns(handleEdit)} data={application} />
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
        )
      )}
    </div>
  );
}
