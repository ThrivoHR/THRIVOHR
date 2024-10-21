import http from "@/lib/https";
import { CreateEmployeeResType } from "@/schemaValidation/employee.schema";
import { FaceListResType } from "@/schemaValidation/face.schema";

const apiFaceRequest = {
      Face: (body: any) =>
        http.post<CreateEmployeeResType>(`/api/v1/face`, body),

      getList: (PageNumber: number, PageSize: number) =>
        http.get<FaceListResType>(
          `/api/v1/face?PageSize=${PageSize}&PageNumber=${PageNumber}`
        ),
  };
  
  export default apiFaceRequest;