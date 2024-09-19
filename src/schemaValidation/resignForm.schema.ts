import { z } from "zod";

export const ResignFormSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  dateTime: z.string(),
  reason: z.string(),
  approverName: z.string(),
  status: z.string(),
});

export const ResignFormPageSchema = z.object({
  totalCount: z.number(),
  pageCount: z.number(),
  pageSize: z.number(),
  pageNumber: z.number(),
});

export const ResignFormFilterSchema = z.object({
  FullName: z.string().optional(),
});

export const ResignFormListRes = z.object({
  paging: ResignFormPageSchema,
  filter: ResignFormFilterSchema,
  value: z.object({
    data: z.array(ResignFormSchema),
  }),
  status: z.number(),
});

export const CreateResignFormSchema = z.object({
  employeeCode: z.string(),
  dateTime: z.string(),
  reason: z.string(),
  lastWorkingDate: z.string(),
});

export const CreateResignFormRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
});

export const UpdateResign = z.object({
  FormID: z.string(),
  FormStatus: z.number(),
});

export const UpdateResignRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
});

export type ResignFormSchemaType = z.infer<typeof ResignFormSchema>;
export type ResignFormPageSchemaType = z.infer<typeof ResignFormPageSchema>;
export type ResignFormFilterType = z.infer<typeof ResignFormFilterSchema>;
export type ResignFormListResType = z.infer<typeof ResignFormListRes>;
export type CreateResignFormType = z.infer<
  typeof CreateResignFormSchema
>;
export type CreateResignFormResType = z.infer<
  typeof CreateResignFormRes
>;
export type UpdateResignType = z.infer<typeof UpdateResign>;
export type UpdateResignResType = z.infer<typeof UpdateResignRes>;
