import { useState } from "react";
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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import apiContractRequest from "@/apiRequest/contract";
import { Badge } from "@/components/ui/badge";

export const Columns = (
  handleDelete: (contract: ContractSchemaType) => void,
  handleEdit: (contract: ContractSchemaType) => void,
  handleOpenModal: (contract: ContractSchemaType) => void,
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
    accessorKey: "employeeName",
    header: "Employee Name",
  },
  {
    accessorKey: "salary",
    header: "Salary",
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
    header: "Expiry",
    cell: ({ row }) => {
      const isExpired = row.original.isNoExpiry;
      return isExpired ? (
        <Badge variant="destructive" className="!bg-red-100 !text-red-800 !dark:bg-red-800 !dark:text-red-100">Expired</Badge>
      ) : (
        <Badge variant="outline">Available</Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const contractData = row.original;
      return (
        <>
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
              <DropdownMenuItem onClick={() => handleOpenModal(contractData)}>
                End Contract
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(contractData)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(contractData)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
