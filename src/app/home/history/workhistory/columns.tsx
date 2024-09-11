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
import { ArrowUpDown } from "lucide-react";

export const columns = (
  handleDelete: (train: TrainingHistorySchemaType) => void,
  // handleEdit: (train: TrainingHistorySchemaType) => void
): ColumnDef<TrainingHistorySchemaType>[] => [
  {
    accessorKey: "employee",
    header: "Employee",
  },
  {
    accessorKey: "startDay",
    header: "Start Day",
  },
  {
    accessorKey: "workshopName",
    header: "Workshop Name",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "status",
    header: "Status",
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
            {/* <DropdownMenuItem onClick={() => handleEdit(row.original)}>Edit</DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => handleDelete(row.original)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
