
import { z } from "zod";

export const RewardAndDisciplinarySchema = z.object({
  id: z.string(),
  isRewards: z.boolean(),
  employeeId: z.string(),
  employeeName: z.string(),
  date: z.string(),
  formOfAction: z.string(),
  amount: z.number(),
  reason: z.string(),
  approverName: z.string(),
  status: z.string(),
});

export const RewardAndDisciplinaryPageSchema = z.object({
  totalCount: z.number(),
  pageCount: z.number(),
  pageSize: z.number(),
  pageNumber: z.number(),
});

export const RewardAndDisciplinaryFilterSchema = z.object({
  EmployeeCode: z.string().optional(),
  IsRewards: z.boolean().optional(),
  FormOfAction: z.number().optional(),
  Status: z.number().optional(),
});

export const RewardAndDisciplinaryListRes = z.object({
  paging: RewardAndDisciplinaryPageSchema,
  filter: RewardAndDisciplinaryFilterSchema,
  value: z.object({
    data: z.array(RewardAndDisciplinarySchema),
  }),
  status: z.number(),
});

export const CreateRewardAndDisciplinarySchema = z.object({
  employeeId: z.string(),
  date: z.string(),
  formOfAction: z.number(),
  amount: z.number(),
  reason: z.string(),
  isRewards: z.boolean(),
  status: z.number(),
});

export const CreateRewardAndDisciplinaryRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
});

export const UpdateRewardAndDisciplinary = z.object({
  rewardAndDisciplinaryModel: z.object({
    employeeId: z.string(),
    date: z.string(),
    formOfAction: z.number(),
    amount: z.number(),
    reason: z.string(),
    isRewards: z.boolean(),
    status: z.number(),
  }),
  id: z.string(),
});

export const UpdateRewardAndDisciplinaryRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
});

export const UpdateRewardAndDisciplinaryStatusSchema = z.object({
  id: z.string(),
  formStatus: z.number(),
});


export const DeleteRewardAndDisciplinary = z.object({
  id: z.string()
})

export const DeleteRewardAndDisciplinaryRes = z.object({
  status: z.number(),
  message: z.string(),
});


export type RewardAndDisciplinarySchemaType = z.infer<typeof RewardAndDisciplinarySchema>;
export type RewardAndDisciplinaryPageType = z.infer<typeof RewardAndDisciplinaryPageSchema>;
export type RewardAndDisciplinaryFilterType = z.infer<typeof RewardAndDisciplinaryFilterSchema>;
export type RewardAndDisciplinaryListResType = z.infer<typeof RewardAndDisciplinaryListRes>;
export type CreateRewardAndDisciplinaryType = z.infer<typeof CreateRewardAndDisciplinarySchema>;
export type CreateRewardAndDisciplinaryResType = z.infer<typeof CreateRewardAndDisciplinaryRes>;
export type UpdateRewardAndDisciplinaryType = z.infer<typeof UpdateRewardAndDisciplinary>;
export type UpdateRewardAndDisciplinaryStatusType = z.infer<typeof UpdateRewardAndDisciplinaryStatusSchema>;
export type UpdateRewardAndDisciplinaryResType = z.infer<typeof UpdateRewardAndDisciplinaryRes>;

export type DeleteRewardAndDisciplinaryType = z.infer<typeof DeleteRewardAndDisciplinary>;
export type DeleteRewardAndDisciplinaryResType = z.infer<typeof DeleteRewardAndDisciplinaryRes>;
