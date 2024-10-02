import http from "@/lib/https";
import {
  DeductionListResType,
  RaiseListResType,
  SalaryFilterType,
  SalaryListResType,
} from "@/schemaValidation/salary.schema";

const apiSalaryRequest = {
  getSalary: (
    PageNumber: number,
    PageSize: number,
    filter: SalaryFilterType | null
  ) =>
    http.get<SalaryListResType>(
      `/api/v1/salary?PageNumber=${PageNumber}&PageSize=${PageSize}${
        filter?.EmployeeCode ? `&EmployeeCode=${filter.EmployeeCode}` : ""
      }${filter?.EmployeeName ? `&EmployeeName=${filter.EmployeeName}` : ""}`
    ),

  getRaise: (
    PageNumber: number,
    PageSize: number,
    filter: SalaryFilterType | null
  ) =>
    http.get<RaiseListResType>(
      `/api/v1/salary/raise?PageNumber=${PageNumber}&PageSize=${PageSize}${
        filter?.EmployeeCode ? `&EmployeeCode=${filter.EmployeeCode}` : ""
      }${filter?.EmployeeName ? `&EmployeeName=${filter.EmployeeName}` : ""}`
    ),

  getDeduction: (
    PageNumber: number,
    PageSize: number,
    filter: SalaryFilterType | null
  ) =>
    http.get<DeductionListResType>(
      `/api/v1/salary/deduction?PageNumber=${PageNumber}&PageSize=${PageSize}${
        filter?.EmployeeCode ? `&EmployeeCode=${filter.EmployeeCode}` : ""
      }${filter?.EmployeeName ? `&EmployeeName=${filter.EmployeeName}` : ""}`
    ),
};

export default apiSalaryRequest;
