import http from "@/lib/https";
import {
  CreateEmployeeResType,
  CreateEmployeeType,
  EmployeeListResType,
  EmployeeFilterType,
  EmployeeSchemaType,
  UpdateEmployeeResType,
  UpdateEmployeeType,
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
        filter?.DateOfBirth ? `&dateOfBirth=${filter.DateOfBirth.toISOString()}` : ""
      }${filter?.DepartmentId ? `&departmentId=${filter.DepartmentId}` : ""}${
        filter?.PositionId ? `&positionId=${filter.PositionId}` : ""}`
    ),

  createEmployee: (body: CreateEmployeeType) =>
    http.post<CreateEmployeeResType>("/api/v1/employee", body),

  updateEmployee: (employeeCode: string | undefined, body: UpdateEmployeeType) =>
    http.put<UpdateEmployeeResType>(`/api/v1/employee/${employeeCode}`, body),

  deleteEmployee: (employeeCode: string) =>
    http.delete<CreateEmployeeResType>(`/api/v1/employee/${employeeCode}`),
};

export default apiEmployeeRequest;
