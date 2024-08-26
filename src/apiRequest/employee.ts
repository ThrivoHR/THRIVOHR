import http from "@/lib/https";
import {
  CreateEmployeeResType,
  CreateEmployeeType,
  EmployeeListResType,
  EmployeeFilterType,
  EmployeeSchemaType,
  UpdateEmployeeResType,
  UpdateEmployeeType,
  DeleteEmployeeType,
} from "@/schemaValidation/employee.schema";

const apiEmployeeRequest = {
  getListEmployee: (PageNumber: number, PageSize: number, filter: EmployeeFilterType | null) =>
    http.get<EmployeeListResType>(
      `/api/v1/employee?PageNumber=${PageNumber}&PageSize=${PageSize}${
        filter?.EmployeeCode ? `&employeeCode=${filter.EmployeeCode}` : ""
      }${filter?.Email ? `&email=${filter.Email}` : ""}${
        filter?.FirstName ? `&firstName=${filter.FirstName}` : ""
      }${filter?.LastName ? `&lastName=${filter.LastName}` : ""}${
        filter?.FullName ? `&fullName=${filter.FullName}` : ""
      }${filter?.PhoneNumber ? `&phoneNumber=${filter.PhoneNumber}` : ""}${
        filter?.IdentityNumber ? `&identityNumber=${filter.IdentityNumber}` : ""
      }${filter?.TaxCode ? `&taxCode=${filter.TaxCode}` : ""}${
        filter?.BankAccount ? `&bankAccount=${filter.BankAccount}` : ""
      }${filter?.Address ? `&address=${filter.Address}` : ""}${
        filter?.DateOfBirth ? `&dateOfBirth=${filter.DateOfBirth}` : ""
      }${filter?.DepartmentId ? `&departmentId=${filter.DepartmentId}` : ""}${
        filter?.PositionId ? `&positionId=${filter.PositionId}` : ""}`
    ),

  createEmployee: (body: CreateEmployeeType) =>
    http.post<CreateEmployeeResType>("/api/v1/employee",{"employee":body}),

  updateEmployee: (employeeCode: string | undefined, body: UpdateEmployeeType) =>
    http.put<UpdateEmployeeResType>(`/api/v1/employee/${employeeCode}`, body),

  deleteEmployee: (body:any) =>
    http.delete<DeleteEmployeeType>(`/api/v1/employee`,{"employeeCode":body}),
};

export default apiEmployeeRequest;
