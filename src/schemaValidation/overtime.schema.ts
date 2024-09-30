import { z } from "zod";

export const OvertimeSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  employeeName: z.string(),
  date: z.string(),
  from: z.number(),
  to: z.number(),
  reason: z.string(),
  status: z.number(),
  isPaid: z.boolean(),
  amount: z.number(),
  approverName: z.string(),
});

export const OvertimePageSchema = z.object({
  totalCount: z.number(),
  pageCount: z.number(),
  pageSize: z.number(),
  pageNumber: z.number(),
});

export const OvertimeFilterSchema = z.object({
  EmployeeId: z.string().optional(),
  Date: z.string().optional(),
  From: z.number().optional(),
  To: z.number().optional(),
  Reason: z.string().optional(),
  Status: z.number().optional(),
  IsPaid: z.boolean().optional(),
  Amount: z.number().optional(),
});

export const OvertimeListRes = z.object({
  paging: OvertimePageSchema,
  filter: OvertimeFilterSchema,
  value: z.object({
    data: z.array(OvertimeSchema),
  }),
  status: z.number(),
});

export const CreateOvertime = z.object({
  employeeId: z.string(),
  date: z.string(),
  from: z.number(),
  to: z.number(),
  reason: z.string(),
  status: z.number(),
  amount: z.number(),
});

export const CreateOvertimeRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
  detail: z.string(),
});

export type OvertimeType = z.infer<typeof OvertimeSchema>;
export type OvertimePageType = z.infer<typeof OvertimePageSchema>;
export type OvertimeFilterType = z.infer<typeof OvertimeFilterSchema>;
export type OvertimeListResType = z.infer<typeof OvertimeListRes>;

export type CreateOvertimeType = z.infer<typeof CreateOvertime>;
export type CreateOvertimeResType = z.infer<typeof CreateOvertimeRes>;


