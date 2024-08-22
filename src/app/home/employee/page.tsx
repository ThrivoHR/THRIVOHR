"use client";

import { useEffect, useState } from "react";
import apiEmployeeRequest from "@/apiRequest/employee";
import { EmployeeSchemaType } from "@/schemaValidation/employee.schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function EmployeeTable() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<EmployeeSchemaType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeSchemaType | null>(null);

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

  const handleDelete = (employee: EmployeeSchemaType) => {
    setSelectedEmployee({
      ...employee,
      employeeCode: employee.employeeCode.toString(),
    });
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedEmployee) {
      try {
        const employeeCodeString = selectedEmployee.employeeCode.toString();
        await apiEmployeeRequest.deleteEmployee(employeeCodeString);

        setEmployees((prev) => prev.filter(emp => emp.employeeCode !== employeeCodeString));
        console.log("Deleted employee:", employeeCodeString);
      } catch (error) {
        console.error("Error deleting employee:", error);
      } finally {
        setDialogOpen(false);
        setSelectedEmployee(null);
      }
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border border-t-0 rounded-lg ">
      <DataTable
        columns={columns(handleDelete)}
        data={employees}
      />
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedEmployee?.fullName}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
