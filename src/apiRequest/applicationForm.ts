import http from "@/lib/https";
import {
  ApplicationFormFilterType,
  ApplicationFormListResType,
  CreateApplicationFormResType,
  CreateApplicationFormType,
  UpdateStatusResType,
} from "@/schemaValidation/applicationForm.schema";

const apiApplicationFormRequest = {
  getApplicationForm: (
    PageNumber: number,
    PageSize: number,
    filter: ApplicationFormFilterType | null
  ) =>
    http.get<ApplicationFormListResType>(
      `/api/v1/applicationform?PageNumber=${PageNumber}&PageSize=${PageSize}${
        filter?.FullName ? `&FullName=${filter.FullName}` : ""
      }`
    ),

  createApplicationForm: (body: CreateApplicationFormType) =>
    http.post<CreateApplicationFormResType>("/api/v1/applicationform", {
      applicationFormModel: body,
    }),

  updateApplicationFormStatus: (Id: string, status: number) =>
    http.put<UpdateStatusResType>(
      `/api/v1/applicationform/update-status/?Id=${Id}?status=${status}`,
      {}
    ),
};

export default apiApplicationFormRequest
