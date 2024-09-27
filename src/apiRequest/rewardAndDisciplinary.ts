import http from "@/lib/https";
import {
  CreateRewardAndDisciplinaryRes,
  CreateRewardAndDisciplinaryResType,
  CreateRewardAndDisciplinaryType,
  DeleteRewardAndDisciplinaryResType,
  RewardAndDisciplinaryFilterType,
  RewardAndDisciplinaryListResType,
  UpdateRewardAndDisciplinaryResType,
  UpdateRewardAndDisciplinaryStatusType,
  UpdateRewardAndDisciplinaryType,
} from "@/schemaValidation/rewardAndDisciplinary.schema";

export const apiRewardAndDisciplinaryRequest = {
  getRewardAndDisciplinary: (
    PageNumber: number,
    PageSize: number,
    filter: RewardAndDisciplinaryFilterType | null
  ) =>
    http.get<RewardAndDisciplinaryListResType>(
      `/api/v1/rewardanddisciplinary?PageNumber=${PageNumber}&PageSize=${PageSize}${
        filter?.EmployeeCode ? `&FullName=${filter.EmployeeCode}` : ""
      }${
        filter?.IsRewards !== undefined ? `&isRewards=${filter.IsRewards}` : ""
      }${filter?.FormOfAction ? `&FormOfAction=${filter.FormOfAction}` : ""}${
        filter?.Status !== undefined ? `&Status=${filter.Status}` : ""
      }`
    ),

  CreateRewardAndDisciplinary: (body: CreateRewardAndDisciplinaryType) =>
    http.post<CreateRewardAndDisciplinaryResType>(
      "/api/v1/rewardanddisciplinary",
      {
        rewardAndDisciplinaryModel: body,
      }
    ),

  UpdateRewardAndDisciplinary: (body: UpdateRewardAndDisciplinaryType) =>
    http.put<UpdateRewardAndDisciplinaryResType>(
      `/api/v1/rewardanddisciplinary`,
      body
    ),

  UpdateRewardAndDisciplinaryStatus: (body: UpdateRewardAndDisciplinaryStatusType) =>
    http.put<UpdateRewardAndDisciplinaryResType>(
      `/api/v1/rewardanddisciplinary/status`,
      body
    ),

  DeleteRewardAndDisciplinary: (id: string) =>
    http.delete<DeleteRewardAndDisciplinaryResType>(
      `/api/v1/rewardanddisciplinary/${id}`,
      {}
    ),
};
