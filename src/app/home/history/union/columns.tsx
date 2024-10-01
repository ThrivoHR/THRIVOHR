import { TrainingHistorySchemaType } from "@/schemaValidation/trainingHistory.schema";
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
import { UnionSchemaType } from "@/schemaValidation/union.schema";
import dayjs from "dayjs";

export const columns = (
  handleUpdate: (union: UnionSchemaType, id:number) => void
): ColumnDef<UnionSchemaType>[] => [
  {
    accessorKey:"employeeCode",
    header: "Employee Code",
  },
  {
    accessorKey:"title",
    header: "Title",
  },
  {
    accessorKey:"dateJoined",
    header: "Date joined",
    cell: ({ row }) => dayjs(row.original.dateJoined).format('DD/MM/YYYY'),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
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
            <DropdownMenuItem onClick={() => handleUpdate(row.original,id)}>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
