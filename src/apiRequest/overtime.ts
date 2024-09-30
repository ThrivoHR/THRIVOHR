import http from "@/lib/https";
import {
    CreateOvertimeResType,
  CreateOvertimeType,
  OvertimeFilterType,
  OvertimeListResType,
} from "@/schemaValidation/overtime.schema";

const apiOvertimeRequest = {
  getListOvertime: (
    PageNumber: number,
    PageSize: number,
    filter: OvertimeFilterType | null
  ) =>
    http.get<OvertimeListResType>(
      `/api/v1/overtime?PageNumber=${PageNumber}&PageSize=${PageSize}${
        filter?.EmployeeId ? `&EmployeeId=${filter.EmployeeId}` : ""
      }${filter?.Date ? `&Date=${filter.Date}` : ""}${
        filter?.From ? `&From=${filter.From}` : ""
      }${filter?.To ? `&To=${filter.To}` : ""}${
        filter?.Reason ? `&Reason=${filter.Reason}` : ""
      }${filter?.Status ? `&Status=${filter.Status}` : ""}${
        filter?.IsPaid ? `&IsPaid=${filter.IsPaid}` : ""
      }${filter?.Amount ? `&Amount=${filter.Amount}` : ""}`
    ),

    createOvertime: (body: CreateOvertimeType) =>
        http.post<CreateOvertimeResType>("/api/v1/overtime", {
          overtimeModel: body,
        }),
};

export default apiOvertimeRequest
