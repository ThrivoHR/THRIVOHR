"use client";

import { useEffect, useState } from "react";
import apiEmployeeRequest from "@/apiRequest/employee";
import { EmployeeSchemaType } from "@/schemaValidation/employee.schema";
import DataTable from "@/components/Table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EmployeeTable() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<EmployeeSchemaType[]>([]);
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeSchemaType | null>(null);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);
  const [employeeCodeToDelete, setEmployeeCodeToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const payload = await apiEmployeeRequest.getListEmployee(1, 10, {});
        setEmployees(payload.payload.value.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    "Employee Code",
    "Full Name",
    "Email",
    "Address",
    "Position",
    "Department",
  ];

  const data = employees.map((employee) => ({
    "Employee Code": String(employee.employeeCode),
    "Full Name": employee.fullName,
    Email: employee.email || "N/A",
    Address: employee.address?.fullAddress || "N/A",
    Position: employee.position.name,
    Department: employee.department.name,
  }));

  const handleEditClick = (row: Record<string, React.ReactNode>) => {
    const employeeCode = String(row["Employee Code"]);
    const employee = employees.find((emp) => emp.employeeCode === employeeCode);
    if (employee) {
      setSelectedEmployee(employee);
      setDialogType("edit");
    }
  };

  const handleDeleteClick = (row: Record<string, React.ReactNode>) => {
    const employeeCode = String(row["Employee Code"]);
    if (employeeCode) {
      setEmployeeCodeToDelete(employeeCode);
      setSelectedEmployee(employees.find(emp => emp.employeeCode === employeeCode) || null);
      setDialogType("delete");
    }
  };

  const handleConfirmDelete = async () => {
    if (employeeCodeToDelete) {
      try {
        await apiEmployeeRequest.deleteEmployee(employeeCodeToDelete);
        setEmployees((prev) =>
          prev.filter((emp) => emp.employeeCode !== employeeCodeToDelete)
        );
        closeDialog();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const closeDialog = () => {
    setSelectedEmployee(null);
    setDialogType(null);
    setEmployeeCodeToDelete(null); // Clear employee code on close
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedEmployee) {
      const { name, value } = e.target;
      setSelectedEmployee((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = async () => {
    // if (selectedEmployee && dialogType === "edit") {
    //   try {
    //     await apiEmployeeRequest.updateEmployee(selectedEmployee.employeeCode, selectedEmployee);
    //     setEmployees((prev) =>
    //       prev.map((emp) =>
    //         emp.employeeCode === selectedEmployee.employeeCode
    //           ? selectedEmployee
    //           : emp
    //       )
    //     );
    //     closeDialog();
    //   } catch (error) {
    //     console.error("Error updating employee:", error);
    //   }
    // }
  };

  return (
    <div className="border border-t-0 rounded-lg">
      <DataTable
        columns={columns}
        data={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      <Dialog open={!!dialogType} onOpenChange={closeDialog}>
        <DialogContent className="w-full max-w-4xl h-auto">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "edit" && "Edit Employee Information"}
              {dialogType === "delete" && "Delete Employee"}
            </DialogTitle>
            <DialogClose />
          </DialogHeader>

          <div className="p-4 bg-white">
            {dialogType === "edit" && selectedEmployee && (
              <form className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="fullName">Full Name:</label>
                  <Input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={selectedEmployee.fullName}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Email:</label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={selectedEmployee.email}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address.fullAddress">Address:</label>
                  <Input
                    id="address.fullAddress"
                    type="text"
                    name="address.fullAddress"
                    value={selectedEmployee.address?.fullAddress || ""}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="position.name">Position:</label>
                  <Input
                    id="position.name"
                    type="text"
                    name="position.name"
                    value={selectedEmployee.position.name}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="department.name">Department:</label>
                  <Input
                    id="department.name"
                    type="text"
                    name="department.name"
                    value={selectedEmployee.department.name}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                </div>
              </form>
            )}
            {dialogType === "delete" && selectedEmployee && (
              <p>
                Are you sure you want to delete employee{" "}
                {selectedEmployee.fullName} - {selectedEmployee.position.name}?
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            {dialogType === "edit" && (
              <Button
                className="bg-blue-300 hover:bg-blue-400"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            )}
            {dialogType === "delete" && (
              <Button className="bg-red-500" onClick={handleConfirmDelete}>
                Confirm Delete
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
