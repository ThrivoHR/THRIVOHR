import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { AbsentFormSchemaType } from "@/schemaValidation/absentForm.schema";
import dayjs from "dayjs";

export const Columns = (
  handleEdit: (absent: AbsentFormSchemaType) => void,
  handleOpenModal: (absent: AbsentFormSchemaType) => void,
): ColumnDef<AbsentFormSchemaType>[] => [
  {
    accessorKey: "number",
    header: "No.",
    cell: ({ row }) => {
      return row.index + 1; // Display row index + 1 to start from 1
    },
  },
  {
    accessorKey: "employeeCode",
    header: "Employee Code",
  },
  {
    accessorKey: "createdDay",
    header: "Created Day",
    cell: ({ row }) => {
      const createdDay = dayjs(row.original.createdDay).format("DD/MM/YYYY");
      return createdDay;
    },
  },
  {
    accessorKey: "period",
    header: "From - To",
    cell: ({ row }) => {
      const from = dayjs(row.original.from).format("DD/MM/YYYY");
      const to = dayjs(row.original.to).format("DD/MM/YYYY");
      return `${from} - ${to}`;
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "approverName",
    header: "Approver Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge>{status}</Badge>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">
              <MoreHorizontal size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                handleEdit(id);
              }}
            >
              Edit
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
