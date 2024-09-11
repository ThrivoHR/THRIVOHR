import z from "zod";

export const TrainingHistorySchema = z.object({
  id:z.number(),
  startDay: z.string(),
  workshopName: z.string(),
  content: z.string(),
  employee: z.string(),
  status: z.number(),
});

export const TrainingHistoryPageSchema = z.object({
  totalCount: z.number(),
  pageCount: z.number(),
  pageSize: z.number(),
  pageNumber: z.number(),
});

export const TrainingHistoryFilterSchema = z.object({
  EmployeeCode: z.string().optional(),
  StartDay: z.string().optional(),
  WorkshopName: z.string().optional(),
  Content: z.string().optional(),
  Status: z.number().optional(),
});

export const TrainingHistoryListRes = z.object({
  paging: TrainingHistoryPageSchema,
  filter: TrainingHistoryFilterSchema,
  value: z.object({
    data: z.array(TrainingHistorySchema),
  }),
  status: z.number(),
});

export const CreateTrainingHistory = z.object({
  startDay: z.string(),
  workshopName: z.string(),
  content:z.string(),
  status:z.number(),
  employeeCode: z.string(),
});

export const CreateTrainingHistoryRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
});

export const DeleteTrainingHistory = z.object({
  id: z.string()
})

export const DeleteTrainingHistoryRes = z.object({
  status: z.number(),
  message: z.string(),
});

export type TrainingHistorySchemaType = z.TypeOf<typeof TrainingHistorySchema>;
export type TrainingHistoryListResType = z.TypeOf<typeof TrainingHistoryListRes>;
export type TrainingHistoryFilterType = z.TypeOf<typeof TrainingHistoryFilterSchema>;
export type TrainingHistoryPageSchemaType = z.TypeOf<typeof TrainingHistoryPageSchema>;
export type CreateTrainingHistoryType = z.TypeOf<typeof CreateTrainingHistory>;
export type CreateTrainingHistoryResType = z.TypeOf<typeof CreateTrainingHistoryRes>;
export type DeleteTrainingHistoryResType = z.TypeOf<typeof DeleteTrainingHistoryRes>;
export type DeleteTrainingHistoryType = z.TypeOf<typeof DeleteTrainingHistory>;
