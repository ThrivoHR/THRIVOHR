import http from "@/lib/https";
import { CreateUnionResType, CreateUnionType, UnionFilterType, UnionListResType, UpdateUnionResType } from "@/schemaValidation/union.schema";

const apiUnionRequest = {
    getApplicationForm: (
        PageNumber: number,
        PageSize: number,
        filter: UnionFilterType | null
      ) =>
        http.get<UnionListResType>(
          `/api/v1/applicationform?PageNumber=${PageNumber}&PageSize=${PageSize}`
        ),
    
      createUnion: (body: CreateUnionType) =>
        http.post<CreateUnionResType>("/api/v1/applicationform", {
          applicationFormModel: body,
        }),
    
      updateUnionStatus: (Id: string, status: number) =>
        http.put<UpdateUnionResType>(
          `/api/v1/applicationform/update-status?Id=${Id}&Status=${status}`,
          {}
        ),
}
