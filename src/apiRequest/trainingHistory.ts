import http from "@/lib/https";
import {
  TrainingHistoryFilterType,
  TrainingHistoryListResType,
  CreateTrainingHistoryResType,
  CreateTrainingHistoryType,
  DeleteTrainingHistoryType,
} from "@/schemaValidation/trainingHistory.schema";

const apiTrainingHistoryRequest = {
  getListTrainingHistory: (
    PageNumber: number,
    PageSize: number,
    filter: TrainingHistoryFilterType | null
  ) =>
    http.get<TrainingHistoryListResType>(
      `/api/v1/traininghistory?PageNumber=${PageNumber}&PageSize=${PageSize}${
        filter?.EmployeeCode ? `&EmployeeCode=${filter.EmployeeCode}` : ""
      }${filter?.StartDay ? `&StartDay=${filter.StartDay}` : ""}
      ${filter?.Content ? `&Content=${filter.Content}` : ""}${
        filter?.Status ? `&Status=${filter.Status}` : ""}${
        filter?.WorkshopName ? `&WorkshopName=${filter.WorkshopName}` : ""}`
    ),

  createTrainingHistory: (body: CreateTrainingHistoryType) =>
    http.post<CreateTrainingHistoryResType>("/api/v1/traininghistory", {
        trainingHistoryModelCreate: body,
    }),

  deleteTrainingHistory: (ID: number | undefined) =>
    http.delete<DeleteTrainingHistoryType>(
      `/api/v1/traininghistory?ID=${ID}`,{}
    ),

//   updateTrainingHistory: (TrainingHistoryId: string | undefined, body: UpdateTrainingHistoryType) =>
//     http.put<UpdateTrainingHistoryResType>(
//       `/api/v1/employeeTrainingHistory?TrainingHistoryID=${TrainingHistoryId}`,
//       body
//     ),
};

export default apiTrainingHistoryRequest;
