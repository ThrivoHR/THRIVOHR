import { z } from "zod";

export const ApplicationFormSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  dateOfBirth: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  nationalID: z.string(),
  gender: z.boolean(),
  educationLevel: z.string(),
  employmentHistory: z.string(),
  status: z.string(),
  positionId: z.number(),
  departmentId: z.number(),
  approverName: z.string(),
});

export const ApplicationFormPageSchema = z.object({
  totalCount: z.number(),
  pageCount: z.number(),
  pageSize: z.number(),
  pageNumber: z.number(),
});

export const ApplicationFormFilterSchema = z.object({
  FullName: z.string().optional(),
});

export const ApplicationFormListRes = z.object({
  paging: ApplicationFormPageSchema,
  filter: ApplicationFormFilterSchema,
  value: z.object({
    data: z.array(ApplicationFormSchema),
  }),
  status: z.number(),
});

export const CreateApplicationFormSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  dateOfBirth: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  nationalID: z.string(),
  gender: z.boolean(),
  educationLevel: z.string(),
  employmentHistory: z.string(),
  status: z.number(),
  positionId: z.number(),
  departmentId: z.number(),
});

export const CreateApplicationFormRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
});

export const UpdateStatus = z.object({
  Id: z.string(),
  status: z.number(),
});

export const UpdateStatusRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
});

export type ApplicationFormSchemaType = z.infer<typeof ApplicationFormSchema>;
export type ApplicationFormPageSchemaType = z.infer<typeof ApplicationFormPageSchema>;
export type ApplicationFormFilterType = z.infer<typeof ApplicationFormFilterSchema>;
export type ApplicationFormListResType = z.infer<
  typeof ApplicationFormListRes
>;
export type CreateApplicationFormType = z.infer<typeof CreateApplicationFormSchema>;
export type CreateApplicationFormResType= z.infer<
  typeof CreateApplicationFormRes
>;
export type UpdateStatusType = z.infer<typeof UpdateStatus>;
export type UpdateStatusResType = z.infer<typeof UpdateStatusRes>;
