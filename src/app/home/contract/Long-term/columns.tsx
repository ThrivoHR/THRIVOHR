import { ContractSchemaType } from "@/schemaValidation/contract.schema";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = (
  handleDelete: (contract: ContractSchemaType) => void,
  handleEdit: (contract: ContractSchemaType) => void
): ColumnDef<ContractSchemaType>[] => [
  {
    accessorKey: "employeeCode",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Employee Code
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "salary",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Salary
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "isNoExpiry",
    header: "Expired",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const contractData = row.original;
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
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEdit(contractData)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(contractData)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
