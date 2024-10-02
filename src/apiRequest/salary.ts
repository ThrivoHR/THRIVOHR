import http from "@/lib/https";
import { SalaryFilterType, SalaryListResType } from "@/schemaValidation/salary.schema";

const apiSalaryRequest = {
    getSalary: (
        PageNumber: number,
    PageSize: number,
    // filter: SalaryFilterType | null
    ) => http.get<SalaryListResType>(
        `/api/v1/salary?PageNumber=${PageNumber}&PageSize=${PageSize}`
      ),

}

export default apiSalaryRequest;