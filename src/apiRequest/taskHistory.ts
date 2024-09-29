import http from "@/lib/https";
import { TaskHistoryFilterType, TaskHistoryListResType } from "@/schemaValidation/taskHistory.schema";

const apiTaskHistoryRequest = {
    getTaskHistory: (
      PageNumber: number,
      PageSize: number,
      filter: TaskHistoryFilterType | null
    ) =>
      http.get<TaskHistoryListResType>(
        `/api/v1/taskhistory?PageNumber=${PageNumber}&PageSize=${PageSize}${
          filter?.TaskId ? `&TaskId=${filter.TaskId}` : ""
        }`
      ),
    }

export default apiTaskHistoryRequest