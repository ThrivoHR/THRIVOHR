import { z } from "zod";
import { EmployeeSchema } from "./employee.schema";
export const BaseResponse = z.object({
    // value: z.array(BaseFilter<TValue>()),
    value: z.object({
        totalCount: z.number(),
        pageSize: z.number(),
        pageNumber: z.number(),
        pageCount: z.number(),
        data: z.array(EmployeeSchema)
    }),
    isSuccess: z.boolean(),
    isFailure: z.boolean(),
    error: z.object({
        code: z.number(),
        message: z.string()
    })
});

