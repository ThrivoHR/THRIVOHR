"use client";

import { useEffect, useState } from "react";
import apiEmployeeRequest from "@/apiRequest/employee";
import {
  EmployeeFilterType,
  EmployeeSchemaType,
  UpdateEmployeeType,
} from "@/schemaValidation/employee.schema";
import { columns } from "./columns";
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
import EmployeeFilter from "./filterReward";
import { EditRewardModal } from "./editReward";
import { Button } from "@/components/ui/button";
import { AddRewardModal } from "./addReward";
import { CirclePlus, Divide, Eye, EyeOff } from "lucide-react";
import LoadingAnimate from "@/components/Loading";
import * as XLSX from "xlsx";
import {
  RewardAndDisciplinaryFilterType,
  RewardAndDisciplinarySchemaType,
  UpdateRewardAndDisciplinaryType,
} from "@/schemaValidation/rewardAndDisciplinary.schema";
import { apiRewardAndDisciplinaryRequest } from "@/apiRequest/rewardAndDisciplinary";
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

export default function RewardTable() {
  const [loading, setLoading] = useState(false);
  const [reward, setReward] = useState<RewardAndDisciplinarySchemaType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [filter, setFilter] = useState<RewardAndDisciplinaryFilterType | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rewardData, setRewardData] =
    useState<UpdateRewardAndDisciplinaryType | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const closeUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedReward(null);
    setSelectedStatus(0); // Reset the status when closing the dialog
  };

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<number>(0);
  const [selectedReward, setSelectedReward] =
    useState<RewardAndDisciplinarySchemaType | null>(null);

  const handleFilterChange = (newFilter: RewardAndDisciplinaryFilterType) => {
    setFilter(newFilter);
    setPage(1);
    setShowTable(true);
  };

  useEffect(() => {
    if (showTable) {
      const fetch = async () => {
        setLoading(true);
        try {
          const data =
            await apiRewardAndDisciplinaryRequest.getRewardAndDisciplinary(
              page,
              pageSize,
              filter
            );
          setReward(data.payload.value.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setReward([]);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }
  }, [page, pageSize, filter, showTable]);

  const handleDelete = (reward: RewardAndDisciplinarySchemaType) => {
    setSelectedReward({
      ...reward,
      id: reward.id.toString(),
    });
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedReward) {
      try {
        const id = selectedReward.id.toString();
        await apiRewardAndDisciplinaryRequest.DeleteRewardAndDisciplinary(id);
        setReward((prev) => prev.filter((emp) => emp.id !== id));
        console.log("Deleted employee:", id);
      } catch (error) {
        console.error("Error deleting employee:", error);
      } finally {
        setDialogOpen(false);
        setSelectedReward(null);
      }
    }
  };

  const saveUpdatedData = async () => {
    if (selectedReward) {
      try {
        const body = {
          id: selectedReward.id,
          formStatus: selectedStatus,
        };
        await apiRewardAndDisciplinaryRequest.UpdateRewardAndDisciplinaryStatus(
          body
        );
        console.log("Contract status updated successfully");
        closeUpdateDialog();
      } catch (error) {
        console.error("Error updating contract status:", error);
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

  const handleEdit = (reward: RewardAndDisciplinarySchemaType) => {
    setRewardData({
      rewardAndDisciplinaryModel: {
        employeeId: reward.employeeId,
        date: reward.date,
        formOfAction: Number(reward.formOfAction),
        amount: reward.amount,
        reason: reward.reason,
        isRewards: reward.isRewards,
        status: Number(reward.status),
      },
      id: reward.id,
    });
    setEditModalOpen(true);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal = (reward: RewardAndDisciplinarySchemaType) => {
    setSelectedReward(reward);
    setIsStatusModalOpen(true);
  };

  return (
    <div>
      <EmployeeFilter onFilter={handleFilterChange} />
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
      <AddRewardModal isOpen={isModalOpen} onClose={closeModal} />

      {showTable ? (
        <>
          {loading ? (
            <div>
              <LoadingAnimate />
            </div>
          ) : (
            <>
              {reward.length > 0 ? (
                <>
                  <DataTable
                    columns={columns(handleDelete, handleEdit, handleOpenModal)}
                    data={reward}
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
                <div>No employees found.</div>
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
              Are you sure you want to delete {selectedReward?.employeeName}?
              This action cannot be undone.
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

      {rewardData && (
        <EditRewardModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setEditModalOpen(false);
          }}
          rewardData={rewardData}
          id={rewardData.id}
        />
      )}

      {selectedReward && (
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
