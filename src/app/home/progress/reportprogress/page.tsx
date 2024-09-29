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
import { Button } from "@/components/ui/button";
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
import { ProjectTaskFilterType, ProjectTaskType } from "@/schemaValidation/projectTask.schema";
import apiProjectTaskRequest from "@/apiRequest/projectTask";
import ProjectTaskFilter from "./filterProjectTask";
import { AddProjectTaskModal } from "./addProjectTask";
import { EditProjectTaskModal } from "./editProjectTask";
import { Input } from "@/components/ui/input";

export default function RewardTable() {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<ProjectTaskType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState<ProjectTaskFilterType | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [taskData, setTaskData] = useState<ProjectTaskType | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const closeUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedTask(null);
    setSelectedStatus(0); // Reset the status when closing the dialog
  };

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<number>(0);
  const [selectedTask, setSelectedTask] = useState<ProjectTaskType | null>(null);

  // New states for handling assignee change and due date reset
  const [isChangeAssigneeModalOpen, setIsChangeAssigneeModalOpen] = useState(false);
  const [isResetDateModalOpen, setIsResetDateModalOpen] = useState(false);
  const [newAssigneeCode, setNewAssigneeCode] = useState<string>("");
  const [newDueDate, setNewDueDate] = useState<string>("");
  const [taskIdForChangeAssignee, setTaskIdForChangeAssignee] = useState<string>("");
  const [taskIdForResetDate, setTaskIdForResetDate] = useState<string>("");

  const handleFilterChange = (newFilter: ProjectTaskFilterType) => {
    setFilter(newFilter);
    setPage(1);
    setShowTable(true);
  };

  useEffect(() => {
    if (showTable) {
      const fetch = async () => {
        setLoading(true);
        try {
          const data = await apiProjectTaskRequest.getProjectTask(page, pageSize, filter);
          setTask(data.payload.value.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setTask([]);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }
  }, [page, pageSize, filter, showTable]);

  const handleDelete = (task: ProjectTaskType) => {
    setSelectedTask({ ...task, id: task.id.toString() });
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedTask) {
      try {
        const id = selectedTask.id.toString();
        await apiProjectTaskRequest.deleteProjectTask(id);
        setTask((prev) => prev.filter((emp) => emp.id !== id));
        console.log("Deleted employee:", id);
      } catch (error) {
        console.error("Error deleting employee:", error);
      } finally {
        setDialogOpen(false);
        setSelectedTask(null);
      }
    }
  };

  const saveUpdatedData = async () => {
    if (selectedTask) {
      try {
        await apiProjectTaskRequest.changeStatus(selectedTask.id, selectedStatus);
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

  const handleEdit = (task: ProjectTaskType) => {
    setTaskData({ ...task, id: task.id.toString() });
    setEditModalOpen(true);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChangeStatus = (task: ProjectTaskType) => {
    setSelectedTask(task);
    setIsStatusModalOpen(true);
  };

  // New function to handle assignee change
  const handleChangeAssignee = (task: ProjectTaskType) => {
    setSelectedTask(task);
    setTaskIdForChangeAssignee(task.id.toString());
    setIsChangeAssigneeModalOpen(true);
  };

  // New function to handle due date reset
  const handleResetDate = (task: ProjectTaskType) => {
    setSelectedTask(task);
    setTaskIdForResetDate(task.id.toString());
    setIsResetDateModalOpen(true);
  };

  const confirmChangeAssignee = async () => {
    if (selectedTask) {
      try {
        await apiProjectTaskRequest.changeAssignee(taskIdForChangeAssignee, newAssigneeCode);
        console.log("Assignee updated successfully");
        setIsChangeAssigneeModalOpen(false);
        setNewAssigneeCode(""); // Reset input
        setTaskIdForChangeAssignee(""); // Reset input
      } catch (error) {
        console.error("Error updating assignee:", error);
      }
    }
  };

  const confirmResetDate = async () => {
    if (selectedTask) {
      try {
        const response = await apiProjectTaskRequest.resetDueDate(taskIdForResetDate, newDueDate);
        console.log(response)
        console.log("Due date reset successfully");
        setIsResetDateModalOpen(false);
        setNewDueDate(""); // Reset input
        setTaskIdForResetDate(""); // Reset input
      } catch (error) {
        console.error("Error resetting due date:", error);
      }
    }
  };

  return (
    <div>
      <ProjectTaskFilter onFilter={handleFilterChange} />
      <div className="flex items-center py-3 space-x-2">
        <Button className="ml-auto" onClick={openModal}>
          <CirclePlus size={16} />
          &nbsp; Add
        </Button>
        <Button variant="secondary" onClick={() => setShowTable((prev) => !prev)}>
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
      <AddProjectTaskModal isOpen={isModalOpen} onClose={closeModal} />

      {showTable ? (
        <>
          {loading ? (
            <div>
              <LoadingAnimate />
            </div>
          ) : (
            <>
              {task.length > 0 ? (
                <>
                  <DataTable
                    columns={columns(
                      handleDelete,
                      handleEdit,
                      handleChangeStatus,
                      handleChangeAssignee,
                      handleResetDate
                    )}
                    data={task}
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
                <div>No employees found.</div>
              )}
            </>
          )}
        </>
      ) : (
        <>Nothing</>
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
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {taskData && (
        <EditProjectTaskModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setEditModalOpen(false);
          }}
          data={taskData}
          TaskId={taskData.id}
        />
      )}

      {selectedTask && (
        <AlertDialog open={isStatusModalOpen} onOpenChange={setUpdateDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Status</AlertDialogTitle>
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
              <AlertDialogCancel onClick={closeUpdateDialog}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={saveUpdatedData}>Update</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Change Assignee Dialog */}
      {selectedTask && (
        <AlertDialog open={isChangeAssigneeModalOpen} onOpenChange={setIsChangeAssigneeModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Change Assignee</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              <Input
                name="assigneeCode"
                placeholder="Assignee Code"
                value={newAssigneeCode}
                onChange={(e) => setNewAssigneeCode(e.target.value)}
                className="border rounded p-2 mb-4"
              />
              <Input
                name="taskId"
                placeholder="Task ID"
                value={taskIdForChangeAssignee}
                readOnly
                className="border rounded p-2"
              />
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsChangeAssigneeModalOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmChangeAssignee}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Reset Date Dialog */}
      {selectedTask && (
        <AlertDialog open={isResetDateModalOpen} onOpenChange={setIsResetDateModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Due Date</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              <Input
                type="date"
                placeholder="Due Date (YYYY-MM-DD)"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="border rounded p-2 mb-4"
              />
              <Input
                placeholder="Task ID"
                value={taskIdForResetDate}
                readOnly
                className="border rounded p-2"
              />
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsResetDateModalOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmResetDate}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
