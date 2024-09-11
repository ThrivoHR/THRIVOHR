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
// import EmployeeFilter from "./filterEmployee";
// import { EditEmployeeModal } from "./editEmployee";
import { Button } from "@/components/ui/button";
import apiTrainingHistoryRequest from "@/apiRequest/trainingHistory";
import { TrainingHistoryFilterType, TrainingHistorySchemaType } from "@/schemaValidation/trainingHistory.schema";
import { UpdateContractType } from "@/schemaValidation/contract.schema";
// import { AddEmployeeModal } from "./addEmployee";

export default function EmployeeTable() {
  const [loading, setLoading] = useState(false);
  const [trainingHistory, setTrainingHistory] = useState<TrainingHistorySchemaType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] =
    useState<TrainingHistorySchemaType | null>(null);
  const [filter, setFilter] = useState<TrainingHistoryFilterType | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [trainingData, setTrainingData] = useState<UpdateContractType | null>(
    null
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleFilterChange = (newFilter: TrainingHistoryFilterType) => {
    setFilter(newFilter);
    setPage(1); 
  };

  useEffect(() => {
    if (filter) {
      const fetchTrainingHistory = async () => {
        setLoading(true);
        try {
          const data = await apiTrainingHistoryRequest.getListTrainingHistory(
            page,
            pageSize,
            filter
          );
          setTrainingHistory(data.payload.value.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setTrainingHistory([]);
        } finally {
          setLoading(false);
        }
      };

      fetchTrainingHistory();
    }
  }, [page, pageSize, filter]);

  const handleDelete = (training: TrainingHistorySchemaType) => {
    setSelectedHistory({
      ...training,
      id: training.id,
    });
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedHistory) {
      try {
        await apiTrainingHistoryRequest.deleteTrainingHistory(
          selectedHistory.id
        );
        setTrainingHistory((prev) =>
          prev.filter((emp) => emp.id !== selectedHistory.id)
        );
        console.log("Deleted employee:", selectedHistory.id);
      } catch (error) {
        console.error("Error deleting employee:", error);
      } finally {
        setDialogOpen(false);
        setSelectedHistory(null);
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

  // const transformRowToUpdateEmployee = (
  //   rowData: EmployeeSchemaType
  // ): UpdateEmployeeType => {
  //   return {
  //     employeeModel: {
  //       employeeCode: rowData.employeeCode.toString(),
  //       firstName: rowData.firstName,
  //       lastName: rowData.lastName,
  //       fullName: rowData.fullName,
  //       identityNumber: rowData.identityNumber,
  //       dateOfBirth: rowData.dateOfBirth,
  //       phoneNumber: rowData.phoneNumber,
  //       taxCode: rowData.taxCode ?? "",
  //       bankAccount: rowData.bankAccount ?? "",
  //       email: rowData.email,
  //       address: {
  //         addressLine: rowData.address.addressLine,
  //         ward: rowData.address.ward,
  //         district: rowData.address.district,
  //         city: rowData.address.city,
  //         country: rowData.address.country,
  //       },
  //     },
  //   };
  // };

  // const handleEdit = (rowData: EmployeeSchemaType) => {
  //   const transformedData = transformRowToUpdateEmployee(rowData);
  //   setEmployeeData(transformedData);
  //   setEditModalOpen(true);
  // };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* <EmployeeFilter onFilter={handleFilterChange} /> */}
      {/* <div className="flex items-center py-3">
        <Button className="ml-auto" onClick={openModal}>
          Add new employee
        </Button>
      </div> */}
      {/* <AddEmployeeModal isOpen={isModalOpen} onClose={closeModal} /> */}

      {/* {filter ? (
        <>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {employees.length > 0 ? (
                <DataTable
                  columns={columns(handleDelete, handleEdit)}
                  data={employees}
                />
              ) : (
                <div>No employees found for the selected filter.</div>
              )}
            </>
          )}

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
                className="px-3 py-2 border rounded-lg text-sm"
              >
                Previous
              </button>
              <span className="mx-4">Page {page}</span>
              <button
                onClick={() => handleChangePage(page + 1)}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="p-4 text-center">
          <p>Try to search something using the filter.</p>
        </div>
      )}

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
      )} */}
    </div>
  );
}
