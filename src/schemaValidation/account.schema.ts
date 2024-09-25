import { z } from "zod";

export const AccountRes = z.object({
    data: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
        department: z.string(),
        position: z.string(),
        employeeCode: z.string(),
    }),
})

export type AccountResType = z.TypeOf<typeof AccountRes>