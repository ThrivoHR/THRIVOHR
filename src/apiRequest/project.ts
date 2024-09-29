import http from "@/lib/https";
import {
    CreateProjectType,
  DeleteProjectResType,
  DeleteProjectType,
  EditProjectMemberResType,
  GetMemberResponseType,
  ProjectFilterSchemaType,
  ProjectListResType,
  UpdateProjectResType,
  UpdateProjectStatusResType,
  UpdateProjectType,
} from "@/schemaValidation/project.schema";

const apiProjectRequest = {
  getProject: (
    PageNumber: number,
    PageSize: number,
    filter: ProjectFilterSchemaType | null
  ) =>
    http.get<ProjectListResType>(
        `/api/v1/project?PageNumber=${PageNumber}&PageSize=${PageSize}` +
        (filter?.ProjectId ? `&ProjectId=${filter?.ProjectId}` : '') +
        (filter?.Name ? `&Name=${filter?.Name}` : '') +
        (filter?.LeaderName ? `&LeaderName=${filter?.LeaderName}` : '') +
        (filter?.SubLeaderName ? `&SubLeaderName=${filter?.SubLeaderName}` : '') +
        (filter?.Status ? `&Status=${filter?.Status}` : '')
      ),

    createProject: (body: CreateProjectType) =>
    http.post<CreateProjectType>("/api/v1/project", {
        projectModel: body,
    }),

    updateProject: (body: UpdateProjectType) =>
    http.put<UpdateProjectResType>(
        `/api/v1/project`,
        body
    ),

    deleteProject: (ProjectId: string) =>
    http.delete<DeleteProjectResType>(
        `/api/v1/project?ProjectId=${ProjectId}`,{}
    ),

    updateStatus:(Id:string, Status:number)=>
    http.put<UpdateProjectStatusResType>(
        `/api/v1/project/change-status?Id=${Id}&Status=${Status}`,{}
    ),

    editMember: (ProjetId: string, EmployeeCode:string, IsRemove:boolean) =>
    http.put<EditProjectMemberResType>(
        `/api/v1/project/edit-member?ProjetId=${ProjetId}&EmployeeCode=${EmployeeCode}&IsRemove=${IsRemove}`,
        {}
    ),

    getProjectAllMember: (ProjectId: string) =>
    http.get<GetMemberResponseType>(
        `/api/v1/project/get-all-member?ProjectId=${ProjectId}`
    ),
};

export default apiProjectRequest;
