import { z } from "zod";

export const ProjectTaskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  assigneeName: z.string(),
  dueDate: z.string(),
  progress: z.number(),
  status: z.string(),
});

export const ProjectTaskPageSchema = z.object({
  totalCount: z.number(),
  pageCount: z.number(),
  pageSize: z.number(),
  pageNumber: z.number(),
});

export const ProjectTaskFilterSchema = z.object({
  ProjectId: z.string().optional(),
  TaskId: z.string().optional(),
  TaskName: z.string().optional(),
  TaskDescription: z.string().optional(),
  TaskStatus: z.number().optional(),
  AssigneeName: z.string().optional(),
  Status: z.number().optional(),
});

export const ProjectTaskListRes = z.object({
  paging: ProjectTaskPageSchema,
  filter: ProjectTaskFilterSchema,
  value: z.object({
    data: z.array(ProjectTaskSchema),
  }),
  status: z.number(),
});

export const CreateProjectTask = z.object({
  name: z.string(),
  description: z.string(),
  projectId: z.string(),
  assigneeCode: z.string(),
  dueDate: z.string(),
});

export const CreateProjectTaskRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
  detail: z.string(),
});

export const UpdateProjectTask = z.object({
  name: z.string(),
  description: z.string(),
  taskId: z.string(),
});

export const UpdateProjectTaskRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
  detail: z.string(),
});

export const UpdateProjectTaskStatus = z.object({
  status: z.number(),
  taskId: z.string(),
});

export const UpdateProjectTaskStatusRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
  detail: z.string(),
});

export const DeleteProjectTask = z.object({
  taskId: z.string(),
});

export const DeleteProjectTaskRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
  detail: z.string(),
});

export const ChangeAssignee = z.object({
  taskId: z.string(),
  assigneeCode: z.string(),
});

export const ChangeAssigneeRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
  detail: z.string(),
});

export const ResetDueDate = z.object({
  taskId: z.string(),
    dueDate: z.string(),
});

export const ResetDueDateRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
  detail: z.string(),
});

export type ProjectTaskType = z.infer<typeof ProjectTaskSchema>;
export type ProjectTaskPageType = z.infer<typeof ProjectTaskPageSchema>;
export type ProjectTaskFilterType = z.infer<typeof ProjectTaskFilterSchema>;
export type ProjectTaskListResType = z.infer<typeof ProjectTaskListRes>;
export type CreateProjectTaskType = z.infer<typeof CreateProjectTask>;
export type CreateProjectTaskResType = z.infer<typeof CreateProjectTaskRes>;
export type UpdateProjectTaskType = z.infer<typeof UpdateProjectTask>;
export type UpdateProjectTaskResType = z.infer<typeof UpdateProjectTaskRes>;
export type UpdateProjectTaskStatusType = z.infer<typeof UpdateProjectTaskStatus>;
export type UpdateProjectTaskStatusResType = z.infer<typeof UpdateProjectTaskStatusRes>;
export type DeleteProjectTaskType = z.infer<typeof DeleteProjectTask>;
export type DeleteProjectTaskResType = z.infer<typeof DeleteProjectTaskRes>;
export type ChangeAssigneeType = z.infer<typeof ChangeAssignee>;
export type ChangeAssigneeRestype = z.infer<typeof ChangeAssigneeRes>;
export type ResetDueDateType = z.infer<typeof ResetDueDate>;
export type ResetDueDateResType = z.infer<typeof ResetDueDateRes>;
