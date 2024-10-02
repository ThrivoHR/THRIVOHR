"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus, Eye, EyeOff } from "lucide-react";
import { AddUnionModal } from "./addUnion";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import LoadingAnimate from "@/components/Loading";
import apiUnionRequest from "@/apiRequest/union";
import {
  UnionFilterType,
  UnionSchemaType,
} from "@/schemaValidation/union.schema";
import UnionFilter from "./filterUnion";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import Image from "next/image";
import none from "/public/nothing-here-.jpg";


export default function UnionTable() {
  const [loading, setLoading] = useState(false);
  const [union, setUnion] = useState<UnionSchemaType[]>([]);
  const [selectedUnion, setSelectedUnion] = useState<UnionSchemaType | null>(
    null
  );
  const [filter, setFilter] = useState<UnionFilterType | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // State for the update dialog
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleFilterChange = (newFilter: UnionFilterType) => {
    setFilter(newFilter);
    setPage(1);
    setShowTable(true); // Show table when filter is applied
  };


  const fetchUnion = async () => {
    setLoading(true);
    try {
      const data = await apiUnionRequest.getUnion(page, pageSize, filter);
      setUnion(data.payload.value.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setUnion([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showTable) {
      fetchUnion();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, filter, showTable]);

  const handleUpdate = (union: UnionSchemaType) => {
    setSelectedUnion(union); // Set the selected union to be updated
    setUpdateDialogOpen(true); // Open the update dialog
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

  // Close the update dialog
  const closeUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedUnion(null); // Clear the selected union
  };

  // Save the updated union data
  const saveUpdatedData = async () => {
    if (selectedUnion) {
      try {
        await apiUnionRequest.updateUnion(selectedUnion, selectedUnion.id); // Call the API to update the union
        setUpdateDialogOpen(false); // Close the dialog after saving
        setSelectedUnion(null); // Clear the selected union
        toast.success("Union updated successfully!");
        await fetchUnion();
      } catch (error) {
        toast.error("Error updating union");
        console.error("Error updating union:", error);
      }
    }
  };

  return (
    <div>
      <UnionFilter onFilter={handleFilterChange} />
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
              <EyeOff size={20} /> &nbsp; Hide Table
            </div>
          ) : (
            <div className="flex items-center">
              <Eye size={20} /> &nbsp; Show Table
            </div>
          )}
        </Button>
      </div>
      <AddUnionModal isOpen={isModalOpen} onClose={closeModal} />

      {showTable ? (
        <>
          {loading ? (
            <div>
              <LoadingAnimate />
            </div>
          ) : (
            <>
                            {union.length > 0 ? (
                <>
                  <DataTable columns={columns(handleUpdate)} data={union} />
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
                <div>No unions found.</div>
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

      {selectedUnion && (
        <AlertDialog
          open={isUpdateDialogOpen}
          onOpenChange={setUpdateDialogOpen}
        >
          <AlertDialogContent className="w-[900px] max-w-6xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Update Union</AlertDialogTitle>
              <AlertDialogDescription>
                Edit union information
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="employeeCode">Employee Code</Label>
                <Input
                  id="employeeCode"
                  value={selectedUnion.employeeCode}
                  onChange={(e) =>
                    setSelectedUnion((prev) =>
                      prev ? { ...prev, employeeCode: e.target.value } : null
                    )
                  }
                />
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={selectedUnion.title}
                  onChange={(e) =>
                    setSelectedUnion((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                />
              </div>

              <div>
                <Label htmlFor="dateJoined">Date Joined</Label>
                <Input
                  id="dateJoined"
                  type="date"
                  value={selectedUnion.dateJoined}
                  onChange={(e) =>
                    setSelectedUnion((prev) =>
                      prev ? { ...prev, dateJoined: e.target.value } : null
                    )
                  }
                />
              </div>
            </div>
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
