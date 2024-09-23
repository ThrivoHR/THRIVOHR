"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { Columns } from "./columns";

import { Button } from "@/components/ui/button";
import { CirclePlus, Eye, EyeOff } from "lucide-react";
import LoadingAnimate from "@/components/Loading";
import apiApplicationFormRequest from "@/apiRequest/applicationForm";
import {
  ApplicationFormFilterType,
  ApplicationFormSchemaType,
  UpdateStatusType,
} from "@/schemaValidation/applicationForm.schema";
import { AddApplicationFormModal } from "./addApplicationForm";
import ApplicationFormFilter from "./filterApplicationForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Contract() {
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<ApplicationFormSchemaType[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<ApplicationFormFilterType | null>(null);
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationFormSchemaType | null>(null); // Track selected application
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false); // Track dialog state
  const [isModalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false); // Table visibility state
  const [selectedStatus, setSelectedStatus] = useState<number>(0);

  const handleFilterChange = (newFilter: ApplicationFormFilterType) => {
    setFilter(newFilter);
    setPage(1);
    fetchData(newFilter);
    setShowTable(true);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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

  // Open the update dialog with the selected row data
  const handleEdit = (rowData: ApplicationFormSchemaType) => {
    setSelectedApplication(rowData);
    setSelectedStatus(0);
    setUpdateDialogOpen(true);
  };

  const closeUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedApplication(null);
    setSelectedStatus(0); // Reset the status when closing the dialog
  };

  const saveUpdatedData = async () => {
    if (selectedApplication) {
      try {
        await apiApplicationFormRequest.updateApplicationFormStatus(
          selectedApplication.id,
          selectedStatus
        );
        console.log("Contract status updated successfully");
        closeUpdateDialog();
        fetchData(filter); // Refresh the data after update
      } catch (error) {
        console.error("Error updating contract status:", error);
      }
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
        <Button onClick={openModal}><CirclePlus size={16} />&nbsp;Add</Button>

        <Button
          variant="secondary"
          onClick={() => setShowTable((prev) => !prev)}
        >
          {showTable ? (
            <div className="flex items-center">
              <EyeOff size={20} />
              &nbsp; Hide Table
            </div>
          ) : (
            <div className="flex items-center">
              <Eye size={20} />
              &nbsp; Show Table
            </div>
          )}
        </Button>
      </div>
      <AddApplicationFormModal isOpen={isModalOpen} onClose={closeModal} />
      {loading ? (
        <div>
          <LoadingAnimate />
        </div>
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
                      onChange={(e) =>
                        handleChangePageSize(Number(e.target.value))
                      }
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
              <div>No applications found.</div>
            )}
          </>
        )
      )}

      {selectedApplication && (
        <AlertDialog
          open={isUpdateDialogOpen}
          onOpenChange={setUpdateDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Contract Status</AlertDialogTitle>
            </AlertDialogHeader>
            <Select value={selectedStatus.toString()}  onValueChange={(value) => setSelectedStatus(Number(value))}>
              <SelectTrigger className="w-full">
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Pending</SelectItem>
                <SelectItem value="1">Approved</SelectItem>
                <SelectItem value="2">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeUpdateDialog}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={saveUpdatedData}>
                Update
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
