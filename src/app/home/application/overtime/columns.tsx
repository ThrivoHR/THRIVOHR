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
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

// Status string to number mapping
const statusMap: { [key: string]: number } = {
  "Pending": 0,
  "Approved": 1,
  "Rejected": 2,
};

// Position mapping
const positionMap: { [key: number]: string } = {
  0: "Admin",
  1: "Manager",
  2: "Staff",
  3: "Intern",
  4: "Supervisor",
  5: "Director",
};

// Department mapping
const departmentMap: { [key: number]: string } = {
  0: "Admin",
  1: "IT",
  2: "Accounting",
  3: "Marketing",
  4: "Sale",
  5: "HR",
};

export const Columns = (
  handleEdit: (application: ApplicationFormSchemaType) => void,
): ColumnDef<ApplicationFormSchemaType>[] => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [currentData, setCurrentData] = useState<ApplicationFormSchemaType | null>(null);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(parseInt(value)); // Convert the string value to number
  };

  const handleDialogOpen = (data: ApplicationFormSchemaType) => {
    setCurrentData(data);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return [
    {
      header: "Full Name",
      accessorKey: "fullName",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber",
    },
    {
      header: "Position",
      accessorKey: "positionId",
      cell: ({ row }) => {
        const positionId = row.original.positionId;
        return positionMap[positionId];
      },
    },
    {
      header: "Department",
      accessorKey: "departmentId",
      cell: ({ row }) => {
        const departmentId = row.original.departmentId;
        return departmentMap[departmentId];
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        return <Badge>{Object.keys(statusMap).find((key) => statusMap[key] === status)}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const data = row.original;

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
                <DropdownMenuItem onClick={() => handleDialogOpen(data)}>
                  Update Status
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Update Status</AlertDialogTitle>
                  <AlertDialogDescription>
                    Select the new status for <strong>{currentData?.fullName}</strong>:
                  </AlertDialogDescription>
                  <Select onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(statusMap).map((status) => (
                        <SelectItem key={status} value={statusMap[status].toString()}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleDialogClose}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      if (selectedStatus !== null && currentData) {
                        handleEdit({ ...currentData, status: selectedStatus });
                        handleDialogClose();
                      }
                    }}
                  >
                    Save Changes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        );
      },
    },
  ];
};
