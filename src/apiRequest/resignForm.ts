import http from "@/lib/https";
import { CreateResignFormResType, CreateResignFormType, ResignFormFilterType, ResignFormListResType, UpdateResignResType } from "@/schemaValidation/resignForm.schema";

const apiResignFormRequest = {
  getResignForm: (
    PageNumber: number,
    PageSize: number,
    filter: ResignFormFilterType | null
  ) =>
    http.get<ResignFormListResType>(
      `/api/v1/resignform?PageNumber=${PageNumber}&PageSize=${PageSize}${
        filter?.FullName ? `&FullName=${filter.FullName}` : ""
      }`
    ),

  createApplicationForm: (body: CreateResignFormType) =>
    http.post<CreateResignFormResType>("/api/v1/resignform", {
        resginModel: body,
    }),

  updateResignForm: ( FormStatus: number,FormID: string) =>
    http.put<UpdateResignResType>(
      `/api/v1/resignform?FormStatus=${FormStatus}&FormID=${FormID}`,
      {}
    ),
};

export default apiResignFormRequest
