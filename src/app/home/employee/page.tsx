"use client";

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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

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
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedEmployee(null);
  };

  const headerStyle = "text-black";

  return (
    <div className="border rounded-lg w-full h-[80vh] flex flex-col">
      <div className="flex-grow overflow-auto">
        <Table className="w-full">
          <TableHeader className="bg-blue-200/40 rounded-t-lg">
            <TableRow>
              <TableHead className={headerStyle}>Employee ID</TableHead>
              <TableHead className={headerStyle}>Department</TableHead>
              <TableHead className={headerStyle}>Email</TableHead>
              <TableHead className={headerStyle}>Phone</TableHead>
              <TableHead className={headerStyle}>Position</TableHead>
              <TableHead className={headerStyle}>Department</TableHead>
              <TableHead className={headerStyle}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleViewClick(employee)}
              >
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
                      <DropdownMenuItem>View</DropdownMenuItem>
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
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Employee Details</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <div className="p-4 bg-white">
              <p>
                <strong>ID:</strong> {selectedEmployee.id}
              </p>
              <p>
                <strong>Department:</strong> {selectedEmployee.department}
              </p>
              <p>
                <strong>Email:</strong> {selectedEmployee.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedEmployee.phone}
              </p>
              <p>
                <strong>Position:</strong> {selectedEmployee.position}
              </p>
              <p>
                <strong>Reports To:</strong> {selectedEmployee.reportsTo}
              </p>
              <p>
                <strong>Full Department:</strong>{" "}
                {selectedEmployee.departmentFull}
              </p>
            </div>
            <DialogFooter>
              <button
                className="mt-4 px-4 py-2 bg-blue-300 text-white rounded"
                onClick={closeDialog}
              >
                Close
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
