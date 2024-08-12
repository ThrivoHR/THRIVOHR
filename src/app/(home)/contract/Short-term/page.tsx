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

type Contract = {
  id: string;
  fullName: string;
  workplace: string;
  startDate: string;
  endDate?: string;
  contractDuration?: string;
  position: string;
  department: string;
  basicSalary: number;
};

const columns = [
  "Full name",
  "Work place",
  "Start date",
  "End date",
  "Duration",
  "Base salary",
];

const employees: Contract[] = [
  {
    id: "EMP001",
    fullName: "Nguyễn Văn A",
    workplace: "Hà Nội",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    contractDuration: "1 năm",
    position: "Nhân viên Kế toán",
    department: "Kế toán",
    basicSalary: 2900,
  },
  {
    id: "EMP002",
    fullName: "Trần Thị B",
    workplace: "TP Hồ Chí Minh",
    startDate: "2023-03-15",
    position: "Nhân viên IT",
    department: "IT",
    basicSalary: 1000,
  },
  {
    id: "EMP003",
    fullName: "Lê Văn C",
    workplace: "Đà Nẵng",
    startDate: "2023-05-01",
    position: "Nhân viên Nhân sự",
    department: "Nhân sự",
    basicSalary: 2000,
  },
  {
    id: "EMP004",
    fullName: "Phạm Thị D",
    workplace: "Hải Phòng",
    startDate: "2022-12-01",
    endDate: "2023-12-01",
    contractDuration: "1 năm",
    position: "Nhân viên Marketing",
    department: "Marketing",
    basicSalary: 1200,
  },
  {
    id: "EMP005",
    fullName: "Hoàng Văn E",
    workplace: "Cần Thơ",
    startDate: "2023-07-01",
    position: "Nhân viên Kinh doanh",
    department: "Kinh doanh",
    basicSalary: 1500,
  },
];

export default function Employee() {
  const [selectedEmployee, setSelectedEmployee] = useState<Contract | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  const handleEditClick = (row: Record<string, React.ReactNode>) => {
    const employee = employees.find((emp) => emp.fullName === row["Full name"]);
    if (employee) {
      setSelectedEmployee(employee);
      setDialogType("edit");
      setIsDialogOpen(true);
    }
  };

  const handleDeleteClick = (row: Record<string, React.ReactNode>) => {
    const employee = employees.find((emp) => emp.fullName === row["Full name"]);
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

  return (
    <div>
      <div>
        <Filter/>
      </div>
      <div className="border rounded-lg w-full h-[80vh] flex flex-col">
        <DataTable
          columns={columns}
          data={employees.map((employee) => ({
            "Full name": employee.fullName,
            "Work place": employee.workplace,
            "Start date": employee.startDate,
            "End date": employee.endDate || "",
            Duration: employee.contractDuration || "",
            Position: employee.position,
            Depart: employee.department,
            "Base salary": employee.basicSalary,
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
                  {dialogType === "edit" && "Edit Employee Information"}
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
                      <label>Họ tên:</label>
                      <Input
                        type="text"
                        name="fullName"
                        value={selectedEmployee.fullName}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Địa điểm làm việc:</label>
                      <Input
                        type="text"
                        name="workplace"
                        value={selectedEmployee.workplace}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Ngày ký:</label>
                      <Input
                        type="text"
                        name="startDate"
                        value={selectedEmployee.startDate}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Ngày kết thúc:</label>
                      <Input
                        type="text"
                        name="endDate"
                        value={selectedEmployee.endDate || ""}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Thời hạn hợp đồng:</label>
                      <Input
                        type="text"
                        name="contractDuration"
                        value={selectedEmployee.contractDuration || ""}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Chức vụ:</label>
                      <Input
                        type="text"
                        name="position"
                        value={selectedEmployee.position}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Phòng ban:</label>
                      <Input
                        type="text"
                        name="department"
                        value={selectedEmployee.department}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Lương cơ bản:</label>
                      <Input
                        type="text"
                        name="basicSalary"
                        value={selectedEmployee.basicSalary}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                      />
                    </div>
                  </form>
                )}
                {dialogType === "delete" && (
                  <p>
                    Bạn có chắc chắn muốn xóa nhân viên{" "}
                    {selectedEmployee.fullName} - {selectedEmployee.position}{" "}
                    không?
                  </p>
                )}
              </div>
              <DialogFooter>
                <button
                  className="mt-4 px-4 py-2 bg-blue-300 text-white rounded"
                  onClick={closeDialog}
                >
                  Đóng
                </button>
                {dialogType === "edit" && (
                  <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                    Lưu thay đổi
                  </button>
                )}
                {dialogType === "delete" && (
                  <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                    Xác nhận xóa
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
