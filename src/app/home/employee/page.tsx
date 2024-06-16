"use client"

import { useState } from "react";
import { ThreeDots } from "@/components/icon";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Dialog, DialogOverlay, DialogContent } from "@/components/ui/dialog";

type Employee = {
  id: string;
  department: string;
  email: string;
  phone: string;
  position: string;
  reportsTo: string;
  departmentFull: string;
};

const employees: Employee[] = [
  {
    id: "EMP001",
    department: "Finance",
    email: "john.doe@example.com",
    phone: "+1 (555) 555-5555",
    position: "Accountant",
    reportsTo: "Jane Smith",
    departmentFull: "Accounting",
  },
  {
    id: "EMP002",
    department: "IT",
    email: "jane.doe@example.com",
    phone: "+1 (555) 555-5556",
    position: "IT Specialist",
    reportsTo: "John Smith",
    departmentFull: "IT",
  },
  {
    id: "EMP003",
    department: "HR",
    email: "bob.smith@example.com",
    phone: "+84 947 1363 27",
    position: "HR Specialist",
    reportsTo: "Jane Doe",
    departmentFull: "HR",
  },
];

export default function Employee() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="border rounded-lg w-full h-[80vh] flex flex-col">
      <div className="flex-grow overflow-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id} className="cursor-pointer hover:bg-gray-100">
                <TableCell className="font-medium">{employee.id}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.departmentFull}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <ThreeDots />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleViewClick(employee)}>View</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="pagination">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {selectedEmployee && (
        <Dialog open={isDialogOpen}>
          <DialogOverlay />
          <DialogContent>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Employee Details</h2>
              <p><strong>ID:</strong> {selectedEmployee.id}</p>
              <p><strong>Department:</strong> {selectedEmployee.department}</p>
              <p><strong>Email:</strong> {selectedEmployee.email}</p>
              <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
              <p><strong>Position:</strong> {selectedEmployee.position}</p>
              <p><strong>Reports To:</strong> {selectedEmployee.reportsTo}</p>
              <p><strong>Full Department:</strong> {selectedEmployee.departmentFull}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={closeDialog}
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
