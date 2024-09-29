import http from "@/lib/https";
import {
  ChangeAssigneeRestype,
  CreateProjectTaskResType,
  CreateProjectTaskType,
  DeleteProjectTaskResType,
  ProjectTaskFilterType,
  ProjectTaskListResType,
  ResetDueDateResType,
  UpdateProjectTaskResType,
  UpdateProjectTaskStatusResType,
  UpdateProjectTaskType,
} from "@/schemaValidation/projectTask.schema";

const apiProjectTaskRequest = {
  getProjectTask: (
    PageNumber: number,
    PageSize: number,
    filter: ProjectTaskFilterType | null
  ) =>
    http.get<ProjectTaskListResType>(
      `/api/v1/projecttask?PageNumber=${PageNumber}&PageSize=${PageSize}` +
        (filter?.ProjectId ? `&ProjectId=${filter?.ProjectId}` : "") +
        (filter?.AssigneeName ? `&AssigneeName=${filter?.AssigneeName}` : "") +
        (filter?.TaskDescription
          ? `&TaskDescription=${filter?.TaskDescription}`
          : "") +
        (filter?.TaskId ? `&TaskId=${filter?.TaskId}` : "") +
        (filter?.Status ? `&Status=${filter?.Status}` : "") +
        (filter?.TaskName ? `&TaskName=${filter?.TaskName}` : "") +
        (filter?.TaskStatus ? `&TaskStatus=${filter?.TaskStatus}` : "")
    ),

  createProjectTask: (body: CreateProjectTaskType) =>
    http.post<CreateProjectTaskResType>("/api/v1/projecttask", {
      projectTaskModel: body,
    }),

  updateProjectTask: (body: UpdateProjectTaskType) =>
    http.put<UpdateProjectTaskResType>(`/api/v1/projecttask`, body),

  deleteProjectTask: (TaskId: string) =>
    http.delete<DeleteProjectTaskResType>(
      `/api/v1/projecttask?TaskId=${TaskId}`,
      {}
    ),

  changeStatus: (TaskId: string, Status: number) =>
    http.put<UpdateProjectTaskStatusResType>(
      `/api/v1/projecttask/change-status?TaskId=${TaskId}&Status=${Status}`,
      {}
    ),

  changeAssignee: (TaskId: string, AssigneeCode: string) =>
    http.put<ChangeAssigneeRestype>(
      `/api/v1/projecttask/change-assignee?TaskId=${TaskId}&AssigneeCode=${AssigneeCode}`,
      {}
    ),

  resetDueDate: (TaskId: string, DueDate: string) =>
    http.put<ResetDueDateResType>(
      `/api/v1/projecttask/reset-due-date?TaskId=${TaskId}&DueDate=${DueDate}`,
      {}
    ),
};

export default apiProjectTaskRequest;
