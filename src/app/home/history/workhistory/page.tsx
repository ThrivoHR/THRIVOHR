"use client";

import { useEffect, useState } from "react";
import apiTrainingHistoryRequest from "@/apiRequest/trainingHistory";
import {
  TrainingHistoryFilterType,
  TrainingHistorySchemaType,
} from "@/schemaValidation/trainingHistory.schema";
import { Button } from "@/components/ui/button";
import { CirclePlus, Eye, EyeOff } from "lucide-react";
import { AddHistoryModal } from "./addHistory";
import HistoryFilter from "./filterHistory";
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
import { DataTable } from "./data-table";
import { columns } from "./columns";
import LoadingAnimate from "@/components/Loading";
import Image from "next/image";
import none from "/public/nothing-here-.jpg";

export default function HistoryTable() {
  const [loading, setLoading] = useState(false);
  const [trainingHistory, setTrainingHistory] = useState<TrainingHistorySchemaType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<TrainingHistorySchemaType | null>(null);
  const [filter, setFilter] = useState<TrainingHistoryFilterType | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const handleFilterChange = (newFilter: TrainingHistoryFilterType) => {
    setFilter(newFilter);
    setPage(1);
    setShowTable(true); // Show table when filter is applied
  };

  const fetchTrainingHistory = async () => {
    setLoading(true);
    try {
      const data = await apiTrainingHistoryRequest.getListTrainingHistory(
        page,
        pageSize,
        filter
      );
      setTrainingHistory(data.payload.value.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTrainingHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showTable) {
      fetchTrainingHistory();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, filter, showTable]); // Fetch data when showTable changes

  const handleDelete = (training: TrainingHistorySchemaType) => {
    setSelectedHistory({
      ...training,
      id: training.id,
    });
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedHistory) {
      try {
        await apiTrainingHistoryRequest.deleteTrainingHistory(selectedHistory.id);
        setTrainingHistory(prev => prev.filter(emp => emp.id !== selectedHistory.id));
        console.log("Deleted training history:", selectedHistory.id);
        await fetchTrainingHistory();
      } catch (error) {
        console.error("Error deleting training history:", error);
      } finally {
        setDialogOpen(false);
        setSelectedHistory(null);
      }
    }
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

  return (
    <div>
      <HistoryFilter onFilter={handleFilterChange} />

      <div className="flex items-center py-3 space-x-2">
        <Button className="ml-auto" onClick={openModal}>
        <CirclePlus size={16} />&nbsp;
          Add
        </Button>
        <Button variant="secondary" onClick={() => setShowTable(prev => !prev)}>
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
      <AddHistoryModal isOpen={isModalOpen} onClose={closeModal} />

      {showTable ? (
        <>
          {loading ? (
            <div>
              <LoadingAnimate />
            </div>
          ) : (
            <>
              {trainingHistory.length > 0 ? (
                <>
                  <DataTable
                    columns={columns(handleDelete)}
                    data={trainingHistory}
                  />
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
                <div>No career history found.</div>
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
              Are you sure you want to delete? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
