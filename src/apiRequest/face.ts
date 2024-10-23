import http from "@/lib/https";
import { CreateEmployeeResType } from "@/schemaValidation/employee.schema";
import { FaceListResType } from "@/schemaValidation/face.schema";

interface ApiResponse<T> {
  value: {
    totalCount: number;
    pageCount: number;
    pageSize: number;
    pageNumber: number;
    data: T[];
  };
  isSuccess: boolean;
  isFailure: boolean;
  error: {
    code: string;
    message: string;
  };
}

const apiFaceRequest = {
      Face: (body: any) =>
        http.post<ApiResponse<any>>(`/api/v1/face`, body),

      getList: (PageNumber: number, PageSize: number) =>
        http.get<FaceListResType>(
          `/api/v1/face?PageSize=${PageSize}&PageNumber=${PageNumber}`
        ),
  };
  
  export default apiFaceRequest;