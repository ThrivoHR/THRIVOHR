import { z } from "zod";

export const TaskHistorySchema = z.object({
    id: z.string(),
    taskId: z.string(),
    changedByName: z.string(),
    changeDate: z.string(),
    oldStatus: z.string(),
    newStatus: z.string(),
    oldAssigneeName: z.string(),
    newAssigneeName: z.string(),
    oldDueDate: z.string(), 
    newDueDate: z.string(),
    oldProgress: z.number(),
    newProgress: z.number(),
    changeDescription: z.string(),
})

export const TaskHistoryPageSchema = z.object({
    totalCount: z.number(),
    pageCount: z.number(),
    pageSize: z.number(),
    pageNumber: z.number(),
});

export const TaskHistoryFilterSchema = z.object({
    TaskId: z.string().optional(),
});

export const TaskHistoryListRes = z.object({
    paging: TaskHistoryPageSchema,
    filter: TaskHistoryFilterSchema,
    value: z.object({
        data: z.array(TaskHistorySchema),
    }),
    status: z.number(),
});

export type TaskHistoryType = z.infer<typeof TaskHistorySchema>;
export type TaskHistoryPageType = z.infer<typeof TaskHistoryPageSchema>;
export type TaskHistoryFilterType = z.infer<typeof TaskHistoryFilterSchema>;
export type TaskHistoryListResType = z.infer<typeof TaskHistoryListRes>;