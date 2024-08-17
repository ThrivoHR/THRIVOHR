"use client";

import { useEffect, useState } from "react";
import apiEmployeeRequest from "@/apiRequest/employee";
import { EmployeeSchemaType } from "@/schemaValidation/employee.schema";
import DataTable from "@/components/Table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function EmployeeTable() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<EmployeeSchemaType[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeSchemaType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const payload = await apiEmployeeRequest.getListEmployee(1, 10, {});
        setEmployees(payload.payload.data);
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

  const columns = ["Employee Code", "Full Name", "Email", "Address", "Position", "Department"];

  const data = employees.map((employee) => ({
    "Employee Code": employee.employeeCode,
    "Full Name": employee.fullName,
    Email: employee.email || "N/A",
    Address: employee.address?.fullAddress || "N/A",
    Position: employee.position.name,
    Department: employee.department.name,
  }));

  const handleEditClick = (row: Record<string, React.ReactNode>) => {
    const employee = employees.find((emp) => emp.employeeCode === row["Employee Code"]);
    if (employee) {
      setSelectedEmployee(employee);
      setDialogType("edit");
      setIsDialogOpen(true);
    }
  };

  const handleDeleteClick = (row: Record<string, React.ReactNode>) => {
    const employee = employees.find((emp) => emp.employeeCode === row["Employee Code"]);
    if (employee) {
      setSelectedEmployee(employee);
      setDialogType("delete");
      setIsDialogOpen(true);
    }
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

  const handleSaveChanges = async () => {
    if (selectedEmployee && dialogType === "edit") {
      try {
        // await apiEmployeeRequest.updateEmployee(selectedEmployee.employeeCode, selectedEmployee);
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.employeeCode === selectedEmployee.employeeCode ? selectedEmployee : emp
          )
        );
        closeDialog();
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedEmployee && dialogType === "delete") {
      try {
        await apiEmployeeRequest.deleteEmployee(selectedEmployee.employeeCode);
        setEmployees((prev) =>
          prev.filter((emp) => emp.employeeCode !== selectedEmployee.employeeCode)
        );
        closeDialog();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div className="border border-t-0 rounded-lg">
      <DataTable
        columns={columns}
        data={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      {selectedEmployee && (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent className="w-full max-w-4xl h-auto">
            <DialogHeader>
              <DialogTitle>
                {dialogType === "edit" && "Edit Employee Information"}
                {dialogType === "delete" && "Delete Employee"}
              </DialogTitle>
              <DialogClose />
            </DialogHeader>
            <div className="p-4 bg-white">
              {dialogType === "edit" && (
                <form className="grid grid-cols-2 gap-4">
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
                    <label>Address:</label>
                    <Input
                      type="text"
                      name="address.fullAddress"
                      value={selectedEmployee.address?.fullAddress || ""}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Position:</label>
                    <Input
                      type="text"
                      name="position.name"
                      value={selectedEmployee.position.name}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Department:</label>
                    <Input
                      type="text"
                      name="department.name"
                      value={selectedEmployee.department.name}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </div>
                </form>
              )}
              {dialogType === "delete" && (
                <p>
                  Are you sure you want to delete employee {selectedEmployee.fullName} -
                  {selectedEmployee.position.name}?
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
                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              )}
              {dialogType === "delete" && (
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={handleConfirmDelete}
                >
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
