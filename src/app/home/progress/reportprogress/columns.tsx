import { EmployeeSchemaType } from "@/schemaValidation/employee.schema";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { RewardAndDisciplinarySchemaType } from "@/schemaValidation/rewardAndDisciplinary.schema";
import { ProjectTaskType } from "@/schemaValidation/projectTask.schema";
import dayjs from "dayjs";
import { TaskHistoryType } from "@/schemaValidation/taskHistory.schema";

export const columns = (
  handleDelete: (task: ProjectTaskType) => void,
  handleEdit: (task: ProjectTaskType) => void,
  handleChangeStatus: (task: ProjectTaskType) => void,
  handleChangeAssignee: (task: ProjectTaskType) => void,
  handleResetDate: (task: ProjectTaskType) => void,
  handleTaskHistory: (task: ProjectTaskType) => void,

): ColumnDef<ProjectTaskType>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "assigneeName",
    header: "Assignee Name",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => dayjs(row.original.dueDate).format("DD/MM/YYYY"),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  // {
  //   accessorKey: "progress",
  //   header: "Progress",
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.original)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangeStatus(row.original)}>
                Update status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeAssignee(row.original)}>
                Change assignee
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleResetDate(row.original)}>
                Reset due date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTaskHistory(row.original)}>
                View task history
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
