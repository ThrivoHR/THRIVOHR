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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns = (
  handleDelete: (train: TrainingHistorySchemaType) => void
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
    cell: ({ getValue }) => {
      const status = getValue();

      let variant: "default" | "secondary" | "destructive" | "outline" =
        "secondary";
      let badgeClasses = "";
      let badgeText = "Unknown";

      switch (status) {
        case "Completed":
          variant = "secondary";
          badgeClasses =
            "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
          badgeText = "Completed";
          break;
        case "InProgress":
          variant = "secondary";
          badgeClasses =
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
          badgeText = "In Progress";
          break;
        case "Failed":
          variant = "secondary";
          badgeClasses =
            "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
          badgeText = "Failed";
          break;
        case "NotStarted":
          variant = "outline";
          badgeClasses =
            "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
          badgeText = "Not Started";
          break;
        default:
          variant = "secondary";
          badgeClasses =
            "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
          badgeText = "Unknown";
      }

      return (
        <Badge variant={variant} className={cn(badgeClasses, "font-medium")}>
          {badgeText}
        </Badge>
      );
    },
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
