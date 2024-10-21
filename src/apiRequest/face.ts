import http from "@/lib/https";
import { CreateEmployeeResType } from "@/schemaValidation/employee.schema";

const apiFaceRequest = {
      Face: (body: any,employeeCode:string) =>
        http.post<CreateEmployeeResType>(`/api/v1/face-recognition?employeeCode=${employeeCode}`, body),

      DetectImage: (body: any) =>
        http.post<CreateEmployeeResType>("/api/v1/face/detect-image", body),
  };
  
  export default apiFaceRequest;