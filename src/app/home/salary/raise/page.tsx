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
import Filter from "@/components/Filter";
import { Button } from "@/components/ui/button";
import { EyeOff } from "lucide-react";

type Employee = {
  id: string;
  fullName: string;
  raise: number;
};

const columns = ["ID", "Full Name", "Raise"];

const employees: Employee[] = [
  {
    id: "EMP001",
    fullName: "John Doe",
    raise: 4000,
  },
  {
    id: "EMP002",
    fullName: "Jane Doe",
    raise: 4000,
  },
  {
    id: "EMP003",
    fullName: "Bob Smith",
    raise: 4000,
  },
];

export default function Employee() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  const handleEditClick = (row: Record<string, React.ReactNode>) => {
    const employee = employees.find((emp) => emp.id === row["ID"])!;
    setSelectedEmployee(employee);
    setDialogType("edit");
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (row: Record<string, React.ReactNode>) => {
    const employee = employees.find((emp) => emp.id === row["ID"])!;
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
    <div>
      <div>
        <Filter/>
      </div>
      <div className="flex justify-end items-center py-3 space-x-2">
          <Button>Add new contract</Button>
          <Button variant="secondary">
            <div className="flex items-center">
              <EyeOff size={20} />
              &nbsp; Hide Table
            </div>
          </Button>
        </div>
      <div className="border rounded-lg w-full h-[80vh] flex flex-col">
        <DataTable
          columns={columns}
          data={employees.map((employee) => ({
            ID: employee.id,
            "Full Name": employee.fullName,
            Raise: employee.raise,
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
                  <form className="grid grid-cols-1 gap-4">
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
                      <label>Full Name:</label>
                      <Input
                        type="text"
                        name="fullName"
                        value={selectedEmployee.fullName}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Raise:</label>
                      <Input
                        type="text"
                        name="joinDate"
                        value={selectedEmployee.raise}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                      />
                    </div>
                  </form>
                )}
                {dialogType === "delete" && (
                  <p>
                    Are you sure you want to delete employee{" "}
                    {selectedEmployee.fullName} with ID {selectedEmployee.id}?
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
    </div>
  );
}
