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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";

export const columns = (
  handleDelete: (employee: EmployeeSchemaType) => void,
  handleEdit: (employee: EmployeeSchemaType) => void,
  handleImage: (employee: EmployeeSchemaType) => void,
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
  {
    accessorKey: "manager",
    header: "Manager",
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setOpen] = useState(false);
      const imageUrl = row.original.imageUrl;
      return imageUrl ? (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="link">
                View
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
              </DialogHeader>
              <DialogDescription>
                <Image src={imageUrl} alt="Image Preview" className="w-full h-auto" width={300} height={300} />
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </>
      ) : null;
    },
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
            <DropdownMenuItem onClick={() => handleImage(employeeData)}>
              Upload Image
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
