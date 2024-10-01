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
import { ApplicationFormSchemaType } from "@/schemaValidation/applicationForm.schema";
import dayjs from "dayjs";

// Status string to number mapping
const statusMap: { [key: string]: number } = {
  Pending: 0,
  Approved: 1,
  Rejected: 2,
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
  handleEdit: (application: ApplicationFormSchemaType) => void
): ColumnDef<ApplicationFormSchemaType>[] => [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date Of Birth",
    cell: ({ row }) => dayjs(row.original.dateOfBirth).format('DD/MM/YYYY'),
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "nationalID",
    header: "National ID",
  },
  {
    accessorKey: "departmentId",
    header: "Department",
    cell: ({ row }) => {
      const departmentId = row.original.departmentId;
      return departmentMap[departmentId];
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      const position = row.original.positionId;
      return positionMap[position];
    },
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
