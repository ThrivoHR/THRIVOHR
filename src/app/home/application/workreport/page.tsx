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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Employee = {
  id: string;
  fullName: string;
  unionCode: string; // Changed from 'union' to 'unionCode'
  joinDate: string;
};

const columns = ["ID", "Full Name", "Union", "Join Date"];

const employees: Employee[] = [
  {
    id: "EMP001",
    fullName: "John Doe",
    unionCode: "SA",
    joinDate: "2023-01-15",
  },
  {
    id: "EMP002",
    fullName: "Jane Doe",
    unionCode: "SA",
    joinDate: "2022-11-20",
  },
  {
    id: "EMP003",
    fullName: "Bob Smith",
    unionCode: "SA",
    joinDate: "2023-03-05",
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
            <div className="flex mb-3 space-x-2">
        <Card className="w-[50%]">
          <CardHeader className="pb-2">
            <CardDescription>This Month Work</CardDescription>
            <CardTitle className="text-4xl">200</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +10% from last month
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={12} aria-label="12% increase" />
          </CardFooter>
        </Card>
        <Card className="w-[50%]">
          <CardHeader className="pb-2">
            <CardDescription>This Month Work</CardDescription>
            <CardTitle className="text-4xl">40</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +10% from last month
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={12} aria-label="12% increase" />
          </CardFooter>
        </Card>
      </div>
      <div className="border rounded-lg w-full min-h-[50%] flex flex-col">
        <DataTable
          columns={columns}
          data={employees.map((employee) => ({
            ID: employee.id,
            "Full Name": employee.fullName,
            Union: employee.unionCode,
            "Join Date": employee.joinDate,
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
                      <label>Join Date:</label>
                      <Input
                        type="text"
                        name="joinDate"
                        value={selectedEmployee.joinDate}
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
