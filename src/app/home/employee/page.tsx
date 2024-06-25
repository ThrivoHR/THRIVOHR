"use client";

import { useState } from "react";
import DataTable from "@/components/Table";
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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Employee = {
  id: string;
  department: string;
  email: string;
  phone: string;
  position: string;
  reportsTo: string;
};

const columns = [
  "Employee ID",
  "Department",
  "Email",
  "Phone",
  "Position",
];

const employees: Employee[] = [
  {
    id: "EMP001",
    department: "Finance",
    email: "john.doe@example.com",
    phone: "+1 (555) 555-5555",
    position: "Accountant",
    reportsTo: "Jane Smith",
  },
  {
    id: "EMP002",
    department: "IT",
    email: "jane.doe@example.com",
    phone: "+1 (555) 555-5556",
    position: "IT Specialist",
    reportsTo: "John Smith",
  },
  {
    id: "EMP003",
    department: "HR",
    email: "bob.smith@example.com",
    phone: "+84 947 1363 27",
    position: "HR Specialist",
    reportsTo: "Jane Doe",
  },
  {
    id: "EMP004",
    department: "Marketing",
    email: "alice.brown@example.com",
    phone: "+1 (555) 555-5557",
    position: "Marketing Specialist",
    reportsTo: "Tom White",
  },
  {
    id: "EMP005",
    department: "Sales",
    email: "mike.jones@example.com",
    phone: "+1 (555) 555-5558",
    position: "Sales Manager",
    reportsTo: "Sara Black",
  },
  {
    id: "EMP006",
    department: "Support",
    email: "emma.watson@example.com",
    phone: "+1 (555) 555-5559",
    position: "Customer Support",
    reportsTo: "Harry Brown",
  },
  {
    id: "EMP007",
    department: "Finance",
    email: "will.smith@example.com",
    phone: "+1 (555) 555-5560",
    position: "Financial Analyst",
    reportsTo: "Jane Smith",
  },
  {
    id: "EMP008",
    department: "IT",
    email: "kevin.malone@example.com",
    phone: "+1 (555) 555-5561",
    position: "Network Administrator",
    reportsTo: "John Smith",
  },
  {
    id: "EMP009",
    department: "HR",
    email: "pam.beesly@example.com",
    phone: "+1 (555) 555-5562",
    position: "HR Manager",
    reportsTo: "Jane Doe",
  },
  {
    id: "EMP010",
    department: "Marketing",
    email: "angela.martin@example.com",
    phone: "+1 (555) 555-5563",
    position: "Marketing Manager",
    reportsTo: "Tom White",
  },
  {
    id: "EMP011",
    department: "Sales",
    email: "jim.halpert@example.com",
    phone: "+1 (555) 555-5564",
    position: "Sales Representative",
    reportsTo: "Sara Black",
  },
];

export default function Employee() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  const handleEditClick = (row: Record<string, React.ReactNode>) => {
    const employee = employees.find((emp) => emp.id === row["Employee ID"])!;
    setSelectedEmployee(employee);
    setDialogType("edit");
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (row: Record<string, React.ReactNode>) => {
    const employee = employees.find((emp) => emp.id === row["Employee ID"])!;
    setSelectedEmployee(employee);
    setDialogType("delete");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedEmployee(null);
    setDialogType(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedEmployee) {
      const { name, value } = e.target;
      setSelectedEmployee({ ...selectedEmployee, [name]: value });
    }
  };

  return (
    <div className="border rounded-lg w-full h-[80vh] flex flex-col">
      <DataTable
        columns={columns}
        data={employees.map((employee) => ({
          "Employee ID": employee.id,
          "Department": employee.department,
          "Email": employee.email,
          "Phone": employee.phone,
          "Position": employee.position,
        }))}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
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
          <DialogContent className="w-full max-w-4xl h-auto">
            <DialogHeader>
              <DialogTitle>
                {dialogType === "edit" && "Edit Employee"}
                {dialogType === "delete" && "Delete Employee"}
              </DialogTitle>
              <DialogClose />
            </DialogHeader>
            <div className="p-4 bg-white">
              {dialogType === "edit" && (
                <form className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label>ID:</label>
                    <Input
                      type="text"
                      name="id"
                      value={selectedEmployee.id}
                      readOnly
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Department:</label>
                    <Input
                      type="text"
                      name="department"
                      value={selectedEmployee.department}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Email:</label>
                    <Input
                      type="email"
                      name="email"
                      value={selectedEmployee.email}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Phone:</label>
                    <Input
                      type="text"
                      name="phone"
                      value={selectedEmployee.phone}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Position:</label>
                    <Input
                      type="text"
                      name="position"
                      value={selectedEmployee.position}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Reports To:</label>
                    <Input
                      type="text"
                      name="reportsTo"
                      value={selectedEmployee.reportsTo}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </div>
                </form>
              )}
              {dialogType === "delete" && (
                <p>
                  Are you sure you want to delete employee {selectedEmployee.id}{" "}
                  - {selectedEmployee.position}?
                </p>
              )}
            </div>
            <DialogFooter>
              <button
                className="mt-4 px-4 py-2 bg-blue-300 text-white rounded"
                onClick={closeDialog}
              >
                Close
              </button>
              {dialogType === "edit" && (
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                  Save Changes
                </button>
              )}
              {dialogType === "delete" && (
                <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                  Confirm Delete
                </button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
