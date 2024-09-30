import http from "@/lib/https";
import { CreateEmployeeResType } from "@/schemaValidation/employee.schema";

const apiImageRequest = {
      uploadImage: (body: any) =>
        http.post<CreateEmployeeResType>("/api/v1/image", body),
  };
  
  export default apiImageRequest;