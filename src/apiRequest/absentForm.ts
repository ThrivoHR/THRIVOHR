import http from "@/lib/https";
import {
  AbsentFormFilterType,
  AbsentFormListResType,
  CreateAbsentFormResType,
  CreateAbsentFormType,
  UpdateAbsentFormResType,
  UpdateAbsentFormStatusType,
  UpdateAbsentFormType,
} from "@/schemaValidation/absentForm.schema";

const apiAbsentFormRequest = {
  getAbsentForm: (
    PageNumber: number,
    PageSize: number,
    filter: AbsentFormFilterType | null
  ) =>
    http.get<AbsentFormListResType>(
      `/api/v1/absentform?PageNumber=${PageNumber}&PageSize=${PageSize}${
        filter?.EmployeeCode ? `&FullName=${filter.EmployeeCode}` : ""
      }`
    ),

  createAbsentForm: (body: CreateAbsentFormType) =>
    http.post<CreateAbsentFormResType>("/api/v1/absentform", {
      absentFormModel: body,
    }),

  updateAbsentForm: (id: string, body:UpdateAbsentFormType) =>
    http.put<UpdateAbsentFormResType>(
      `/api/v1/absentform/${id}`,
      body
    ),

  updateAbsentFormStatus: (id: string, body: UpdateAbsentFormStatusType) =>
    http.put<UpdateAbsentFormResType>(
      `/api/v1/absentform/${id}/status`,
      body
    ),
};

export default apiAbsentFormRequest;
