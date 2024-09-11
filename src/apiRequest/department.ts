import http from "@/lib/https";
import { DepartmentListResType } from "@/schemaValidation/department.schema";

const apiDepartmentRequest = {
  getDepartment: async () => {
    const response = await http.get<DepartmentListResType>("/api/v1/department");
    return response;
  },
};

export default apiDepartmentRequest;
