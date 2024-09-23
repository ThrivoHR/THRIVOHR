import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { ApplicationFormSchemaType } from "@/schemaValidation/applicationForm.schema";
import { ResignFormSchemaType } from "@/schemaValidation/resignForm.schema";
import dayjs from "dayjs";

export const Columns = (
  handleEdit: (resign: ResignFormSchemaType) => void
): ColumnDef<ResignFormSchemaType>[] => [
  {
    accessorKey: "number",
    header: "No.",
    cell: ({ row }) => {
      return row.index + 1; // Display row index + 1 to start from 1
    },
  },
  {
    accessorKey: "dateTime",
    header: "Date",
    cell: ({ row }) => {
      return dayjs(row.original.dateTime).format("YYYY/MM/DD - HH:mm:ss");
    },
  },
  {
    accessorKey:"reason",
    header: "Reason",
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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
