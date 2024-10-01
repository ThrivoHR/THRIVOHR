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
import dayjs from "dayjs";

export const columns = (
  handleDelete: (reward: RewardAndDisciplinarySchemaType) => void,
  handleEdit: (reward: RewardAndDisciplinarySchemaType) => void,
  handleOpenModal: (reward: RewardAndDisciplinarySchemaType) => void,
): ColumnDef<RewardAndDisciplinarySchemaType>[] => [
  {
    accessorKey: "employeeId",
    header: "Employee ID",
  },
  {
    accessorKey: "employeeName",
    header: "Employee Name",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => dayjs(row.original.date).format('DD/MM/YYYY'),
  },
  {
    accessorKey: "formOfAction",
    header: "Form of Action",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "isRewards",
    header: "Is Reward",
  },
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
            <DropdownMenuItem onClick={() => handleOpenModal(row.original)}>
                Update status
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
