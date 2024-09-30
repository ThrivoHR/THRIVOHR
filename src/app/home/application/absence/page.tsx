"use client";

import { useEffect, useState } from "react";
import {
  EmployeeFilterType,
  EmployeeSchemaType,
  UpdateEmployeeType,
} from "@/schemaValidation/employee.schema";

import { DataTable } from "./data-table";
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
import EmployeeFilter from "./filterAbsentForm";
import { EditAbsentModal } from "./editAbsent";
import { Button } from "@/components/ui/button";
import { AddAbsentFormModal } from "./addAbsentForm";
import { CirclePlus, Divide, Eye, EyeOff } from "lucide-react";
import LoadingAnimate from "@/components/Loading";
import {
  AbsentFormFilterType,
  AbsentFormSchemaType,
  UpdateAbsentFormType,
} from "@/schemaValidation/absentForm.schema";
import apiAbsentFormRequest from "@/apiRequest/absentForm";
import AbsentFormFilter from "./filterAbsentForm";
import { Columns } from "./columns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import none from "/public/nothing-here-.jpg";

export default function AbsentTable() {
  const [loading, setLoading] = useState(false);
  const [absent, setAbsent] = useState<AbsentFormSchemaType[]>([]);
  const [selectedAbsent, setSelectedAbsent] =
    useState<AbsentFormSchemaType | null>(null);
  const [filter, setFilter] = useState<AbsentFormFilterType | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [absentData, setAbsentData] = useState<UpdateAbsentFormType | null>(
    null
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<number>(0);
  const closeUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedAbsent(null);
    setSelectedStatus(0); // Reset the status when closing the dialog
  };
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // Handle filter change and ensure table is shown
  const handleFilterChange = (newFilter: AbsentFormFilterType) => {
    setFilter(newFilter);
    setPage(1);
    setShowTable(true); // Show table when filter is applied
  };

  const handleOpenModal = (absent: AbsentFormSchemaType) => {
    setSelectedAbsent(absent);
    setIsStatusModalOpen(true);
  };

  useEffect(() => {
    if (showTable) {
      const fetch = async () => {
        setLoading(true);
        try {
          const data = await apiAbsentFormRequest.getAbsentForm(
            page,
            pageSize,
            filter
          );
          setAbsent(data.payload.value.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setAbsent([]);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }
  }, [page, pageSize, filter, showTable]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const transformRowToUpdate = (
    rowData: AbsentFormSchemaType
  ): UpdateAbsentFormType => {
    return {
      absentFormModel: {
        employeeCode: rowData.employeeCode.toString(),
        from: rowData.from,
        to: rowData.to,
        reason: rowData.reason,
      },
      id: rowData.id,
    };
  };

  const handleEdit = (rowData: AbsentFormSchemaType) => {
    const transformedData = transformRowToUpdate(rowData);
    setAbsentData(transformedData);
    setEditModalOpen(true);
  };

  const saveUpdatedData = async () => {
    if (selectedAbsent) {
      try {
        const requestBody = {
          id: selectedAbsent.id,
          status: selectedStatus, // The status you want to update
        };
        await apiAbsentFormRequest.updateAbsentFormStatus(
          selectedAbsent.id,
          requestBody
        );
        console.log("Contract status updated successfully");
        closeUpdateDialog();
      } catch (error) {
        console.error("Error updating contract status:", error);
      }
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <AbsentFormFilter onFilter={handleFilterChange} />
      <div className="flex items-center py-3 space-x-2">
        <Button className="ml-auto" onClick={openModal}>
          <CirclePlus size={16} />
          &nbsp; Add
        </Button>
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
      <AddAbsentFormModal isOpen={isModalOpen} onClose={closeModal} />

      {showTable ? (
        <>
          {loading ? (
            <div>
              <LoadingAnimate />
            </div>
          ) : (
            <>
              {absent.length > 0 ? (
                <>
                  <DataTable
                    columns={Columns(handleEdit, handleOpenModal)}
                    data={absent}
                  />
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
                        className="px-3 py-2 border rounded-lg text-sm"
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
                <div>Nothing found</div>
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

      {absentData && (
        <EditAbsentModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setEditModalOpen(false);
          }}
          absentData={absentData}
          id={absentData.id}
        />
      )}

      {selectedAbsent && (
        <AlertDialog
          open={isStatusModalOpen}
          onOpenChange={setUpdateDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Contract Status</AlertDialogTitle>
            </AlertDialogHeader>
            <Select
              value={selectedStatus.toString()}
              onValueChange={(value) => setSelectedStatus(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue>Select status</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">Pending</SelectItem>
                  <SelectItem value="1">Approved</SelectItem>
                  <SelectItem value="2">Rejected</SelectItem>
                </SelectGroup>
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
