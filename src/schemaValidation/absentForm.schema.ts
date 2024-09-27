import { z } from "zod";


export const AbsentFormSchema = z.object({
    id: z.string(),
    createdDay: z.string(),
    employeeCode: z.string(),
    from: z.string(),
    to: z.string(),
    reason: z.string(),
    approverName: z.string(),
    status: z.string(),
})

export const AbsentFormPageSchema = z.object({
    totalCount: z.number(),
    pageCount: z.number(),
    pageSize: z.number(),
    pageNumber: z.number(),
})

export const AbsentFormFilterSchema = z.object({
    EmployeeCode: z.string().optional(),
})

export const AbsentFormListRes = z.object({
    paging: AbsentFormPageSchema,
    filter: AbsentFormFilterSchema,
    value: z.object({
        data: z.array(AbsentFormSchema),
    }),
    status: z.number(),
})

export const CreateAbsentFormSchema = z.object({
    employeeCode: z.string(),
    from: z.string(),
    to: z.string(),
    reason: z.string(),
})

export const CreateAbsentFormRes = z.object({
    status: z.number(),
    message: z.string(),
    log: z.string(),
})

export const UpdateAbsentFormSchema = z.object({
    absentFormModel: z.object({
        employeeCode: z.string(),
        from: z.string(),
        to: z.string(),
        reason: z.string(),
    }),
    id: z.string(),
})

export const UpdateAbsentFormStatusSchema = z.object({
    id: z.string(),
    status:z.number()
});

export const UpdateAbsentFormRes = z.object({
    status: z.number(),
    message: z.string(),
    log: z.string(),
})

export type AbsentFormSchemaType = z.infer<typeof AbsentFormSchema>;
export type AbsentFormPageType = z.infer<typeof AbsentFormPageSchema>;
export type AbsentFormFilterType = z.infer<typeof AbsentFormFilterSchema>;
export type AbsentFormListResType = z.infer<typeof AbsentFormListRes>;
export type CreateAbsentFormType = z.infer<typeof CreateAbsentFormSchema>;
export type CreateAbsentFormResType = z.infer<typeof CreateAbsentFormRes>;
export type UpdateAbsentFormType = z.infer<typeof UpdateAbsentFormSchema>;
export type UpdateAbsentFormStatusType = z.infer<typeof UpdateAbsentFormStatusSchema>;
export type UpdateAbsentFormResType = z.infer<typeof UpdateAbsentFormRes>;

