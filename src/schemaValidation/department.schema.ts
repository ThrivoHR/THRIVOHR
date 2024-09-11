import { z } from "zod";

export const DepartmentListRes = z.object({
  value: z.record(z.string()), 
  isSuccess: z.boolean(),
  isFailure: z.boolean(),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

export type DepartmentListResType = z.infer<typeof DepartmentListRes>;
