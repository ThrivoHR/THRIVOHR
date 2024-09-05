import http from "@/lib/https";
import {
  ContractFilterType,
  ContractListResType,
  CreateContractResType,
  CreateContractType,
  EndContractType,
  UpdateContractResType,
  UpdateContractType,
} from "@/schemaValidation/contract.schema";

const apiContractRequest = {
  getListContract: (
    PageNumber: number,
    PageSize: number,
    filter: ContractFilterType | null
  ) =>
    http.get<ContractListResType>(
      `/api/v1/employeecontract?PageNumber=${PageNumber}&PageSize=${PageSize}${
        filter?.EmployeeCode ? `&EmployeeCode=${filter.EmployeeCode}` : ""
      }${filter?.StartDate ? `&StartDate=${filter.StartDate}` : ""}${
        filter?.EndDate ? `&EndDate=${filter.EndDate}` : ""
      }${filter?.Salary ? `&Salary=${filter.Salary}` : ""}${
        filter?.Department ? `&Department=${filter.Department}` : ""
      }${filter?.Position ? `&Position=${filter.Position}` : ""}`
    ),

  createContract: (body: CreateContractType) =>
    http.post<CreateContractResType>("/api/v1/employeecontract", {
      employeeContractModel: body,
    }),

  deleteContract: (contractId: string | undefined, body: any) =>
    http.delete<EndContractType>(
      `/api/v1/employeecontract?ContractID=${contractId}`,
      { contractID: body }
    ),

  updateContract: (contractId: string | undefined, body: UpdateContractType) =>
    http.put<UpdateContractResType>(
      `/api/v1/employeecontract?ContractID=${contractId}`,
      body
    ),
  endContract: (contractId: string | undefined, body: any) =>
    http.put<EndContractType>(
      `/api/v1/employeecontract/end-employee-contract?ContractID=${contractId}`,
      { contractID: body }
    ),
};

export default apiContractRequest;
