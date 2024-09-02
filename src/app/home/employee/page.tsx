"use client";

import { useEffect, useState } from "react";
import apiEmployeeRequest from "@/apiRequest/employee";
import {
  EmployeeFilterType,
  EmployeeSchemaType,
  UpdateEmployeeType,
} from "@/schemaValidation/employee.schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EmployeeFilter from "./filterEmployee";
import { EditEmployeeModal } from "./editEmployee";

export default function EmployeeTable() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<EmployeeSchemaType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeSchemaType | null>(null);
  const [filter, setFilter] = useState<EmployeeFilterType | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [employeeData, setEmployeeData] = useState<UpdateEmployeeType | null>(
    null
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleFilterChange = (newFilter: EmployeeFilterType) => {
    setFilter(newFilter);
    setPage(1); // Reset to page 1 when filters change
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const data = await apiEmployeeRequest.getListEmployee(
          page,
          pageSize,
          filter
        );
        setEmployees(data.payload.value.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [page, pageSize, filter]);

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
        await apiEmployeeRequest.deleteEmployee(employeeCodeString,employeeCodeString);
        setEmployees((prev) =>
          prev.filter((emp) => emp.employeeCode !== employeeCodeString)
        );
        console.log("Deleted employee:", employeeCodeString);
      } catch (error) {
        console.error("Error deleting employee:", error);
      } finally {
        setDialogOpen(false);
        setSelectedEmployee(null);
      }
    }
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const transformRowToUpdateEmployee = (
    rowData: EmployeeSchemaType
  ): UpdateEmployeeType => {
    return {
      employeeModel: {
        employeeCode: rowData.employeeCode.toString(),
        firstName: rowData.firstName,
        lastName: rowData.lastName,
        fullName: rowData.fullName,
        identityNumber: rowData.identityNumber,
        dateOfBirth: rowData.dateOfBirth,
        phoneNumber: rowData.phoneNumber,
        taxCode: rowData.taxCode ?? "",
        bankAccount: rowData.bankAccount ?? "",
        email: rowData.email,
        address: {
          addressLine: rowData.address.addressLine,
          ward: rowData.address.ward,
          district: rowData.address.district,
          city: rowData.address.city,
          country: rowData.address.country,
        },
      },
    };
  };

  const handleEdit = (rowData: EmployeeSchemaType) => {
    const transformedData = transformRowToUpdateEmployee(rowData);
    setEmployeeData(transformedData);
    setEditModalOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <EmployeeFilter onFilter={handleFilterChange} />
      <DataTable columns={columns(handleDelete, handleEdit)} data={employees} />
      <div className="flex justify-between items-center p-4">
        <div>
          <select
            value={pageSize}
            onChange={(e) => handleChangePageSize(Number(e.target.value))}
            className="px-4 py-2 border rounded-lg"
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => handleChangePage(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-lg"
          >
            Previous
          </button>
          <span className="mx-4">Page {page}</span>
          <button
            onClick={() => handleChangePage(page + 1)}
            className="px-4 py-2 border rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedEmployee?.fullName}? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {employeeData && (
        <EditEmployeeModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setEditModalOpen(false);
          }}
          employeeData={employeeData}
          employeeCode={employeeData.employeeModel.employeeCode}
        />
      )}
    </div>
  );
}
