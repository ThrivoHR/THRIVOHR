import http from "@/lib/https";
import {
  CreateUnionResType,
  CreateUnionType,
  UnionFilterType,
  UnionListResType,
  UpdateUnionResType,
  UpdateUnionType,
} from "@/schemaValidation/union.schema";

const apiUnionRequest = {
  getUnion: (
    PageNumber: number,
    PageSize: number,
    filter: UnionFilterType | null
  ) =>
    http.get<UnionListResType>(
      `/api/v1/union?PageNumber=${PageNumber}&PageSize=${PageSize}${
        filter?.EmployeeCode ? `&EmployeeCode=${filter.EmployeeCode}` : ""
      }${filter?.Title ? `&Title=${filter.Title}` : ""}${
        filter?.DateJoined ? `&DateJoined=${filter.DateJoined}` : ""
      }`
    ),

  createUnion: (body: CreateUnionType) =>
    http.post<CreateUnionResType>("/api/v1/union", {
      unionModel: body,
    }),

  updateUnion: (body: UpdateUnionType, id: number) =>
    http.put<UpdateUnionResType>(`/api/v1/union`, { unionModel: body, id: id }),
};

export default apiUnionRequest;
