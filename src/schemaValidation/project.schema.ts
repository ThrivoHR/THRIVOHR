import Employee from "@/app/home/progress/reportprogress/page";
import { describe } from "node:test";
import { z } from "zod";


export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    leaderName: z.string(),
    totalEmployee: z.number(),
    totalTask: z.number(),
    subLeaderName: z.string(),
    progress: z.number(),
    status: z.string(), 
})

export const ProjectPageSchema = z.object({
    totalCount: z.number(),
    pageCount: z.number(),
    pageSize: z.number(),
    pageNumber: z.number(),
});

export const ProjectFilterSchema = z.object({
    ProjectId: z.string().optional(),
    Name: z.string().optional(),
    LeaderName: z.string().optional(),
    SubLeaderName: z.string().optional(),
    Status: z.number().optional(),
});

export const ProjectListRes = z.object({
    paging: ProjectPageSchema,
    filter: ProjectFilterSchema,
    value: z.object({
        data: z.array(ProjectSchema),
    }),
    status: z.number(),
});

export const CreateProject = z.object({
    name: z.string(),
    description: z.string(),
    leaderCode: z.string(),
    subLeaderCode: z.string(),   
})

export const CreateProjectRes = z.object({
    status: z.number(),
  message: z.string(),
  log: z.string(),
  detail: z.string(),
})

export const UpdateProject = z.object({
    projectModel: z.object({
        name: z.string(),
        description: z.string(),
        leaderCode: z.string(),
        subLeaderCode: z.string(),
    }),
    id: z.string(),
})

export const UpdateProjectRes = z.object({
    status: z.number(),
    message: z.string(),
    log: z.string(),
    detail: z.string(),
})

export const DeleteProject = z.object({
    ProjectId: z.string(),
})

export const DeleteProjectRes = z.object({
    status: z.number(),
    message: z.string(),
    log: z.string(),
    detail: z.string(),
})

export const UpdateProjectStatus = z.object({
    Id: z.string(),
    status: z.number(),
})

export const UpdateProjectStatusRes = z.object({
    status: z.number(),
    message: z.string(),
    log: z.string(),
    detail: z.string(),
})

export const EditProjectMember = z.object({
    ProjetId: z.string(),
    EmployeeCode: z.string(),
    isRemove: z.boolean(),
})

export const EditProjectMemberRes = z.object({
    status: z.number(),
    message: z.string(),
    log: z.string(),
    detail: z.string(),
})

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;

export type ProjectPageSchemaType = z.infer<typeof ProjectPageSchema>;

export type ProjectFilterSchemaType = z.infer<typeof ProjectFilterSchema>;

export type ProjectListResType = z.infer<typeof ProjectListRes>;

export type CreateProjectType = z.infer<typeof CreateProject>;

export type CreateProjectResType = z.infer<typeof CreateProjectRes>;

export type UpdateProjectType = z.infer<typeof UpdateProject>;

export type UpdateProjectResType = z.infer<typeof UpdateProjectRes>;

export type DeleteProjectType = z.infer<typeof DeleteProject>;

export type DeleteProjectResType = z.infer<typeof DeleteProjectRes>;

export type UpdateProjectStatusType = z.infer<typeof UpdateProjectStatus>;

export type UpdateProjectStatusResType = z.infer<typeof UpdateProjectStatusRes>;

export type EditProjectMemberType = z.infer<typeof EditProjectMember>;

export type EditProjectMemberResType = z.infer<typeof EditProjectMemberRes>;
