"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { Columns } from "./columns";

import { Button } from "@/components/ui/button";
import { CirclePlus, Eye, EyeOff } from "lucide-react";
import LoadingAnimate from "@/components/Loading";
import { AddResignFormModal } from "./addResignForm";
import ApplicationFormFilter from "./filterResignForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Select components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import apiResignFormRequest from "@/apiRequest/resignForm";
import {
  ResignFormFilterType,
  ResignFormSchemaType,
} from "@/schemaValidation/resignForm.schema";
import Image from "next/image";
import none from "/public/nothing-here-.jpg";

export default function Contract() {
  const [loading, setLoading] = useState(false);
  const [resign, setResign] = useState<ResignFormSchemaType[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<ResignFormFilterType | null>(null);
  const [selectedResign, setSelectedResign] =
    useState<ResignFormSchemaType | null>(null);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<number>(0);

  const handleFilterChange = (newFilter: ResignFormFilterType) => {
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

  const fetchData = async (filter: ResignFormFilterType | null) => {
    setLoading(true);
    try {
      const [data] = await Promise.all([
        apiResignFormRequest.getResignForm(page, pageSize, filter),
      ]);
      setResign(data.payload.value.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResign([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (rowData: ResignFormSchemaType) => {
    setSelectedResign(rowData);
    setSelectedStatus(0);
    setUpdateDialogOpen(true);
  };

  const closeUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedResign(null);
    setSelectedStatus(0); // Reset the status when closing the dialog
  };

  const saveUpdatedData = async () => {
    if (selectedResign) {
      try {
        await apiResignFormRequest.updateResignForm(
          selectedStatus,
          selectedResign.id
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, showTable,filter]);

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
      <AddResignFormModal isOpen={isModalOpen} onClose={closeModal} />
      
      {showTable ? (
        <>
          {loading ? (
            <div>
              <LoadingAnimate />
            </div>
          ) : (
            <>
            {resign.length > 0 ? (
              <>
                <DataTable columns={Columns(handleEdit)} data={resign} />
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
              <div>No resignation found.</div>
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

      {selectedResign && (
        <AlertDialog
          open={isUpdateDialogOpen}
          onOpenChange={setUpdateDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Resign Status</AlertDialogTitle>
            </AlertDialogHeader>
            <Select
              value={selectedStatus.toString()}
              onValueChange={(value) => setSelectedStatus(Number(value))}
            >
              <SelectTrigger className="w-full"></SelectTrigger>
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
