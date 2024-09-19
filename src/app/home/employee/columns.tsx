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

export const columns = (
  handleDelete: (employee: EmployeeSchemaType) => void,
  handleEdit: (employee: EmployeeSchemaType) => void
): ColumnDef<EmployeeSchemaType>[] => [
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
    accessorKey: "fullName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Full Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "sex",
    header: "Gender",
    cell: ({ row }) => (row.original.sex ? "Male" : "Female"),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  // {
  //   accessorKey: "phoneNumber",
  //   header: "Phone Number",
  // },
  // {
  //   accessorKey: "taxCode",
  //   header: "Tax Code",
  // },
  // {
  //   accessorKey: "bankAccount",
  //   header: "Bank Account",
  // },
  {
    accessorKey: "address.fullAddress",
    header: "Full Address",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  // {
  //   accessorKey: "dateOfBirth",
  //   header: "Date of Birth",
  // },
  {
    accessorKey: "manager",
    header: "Manager",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const employeeData = row.original;
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
            <DropdownMenuItem onClick={() => handleEdit(employeeData)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(employeeData)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
