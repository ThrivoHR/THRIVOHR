import Employee from "@/app/home/history/addition/page";
import { title } from "process";
import { z } from "zod";

export const UnionSchema = z.object({
    id: z.string(),
    employeeCode: z.string(),
    title: z.string(),
    dateJoined: z.string(),
  });

export const UnionPageSchema = z.object({
    totalCount: z.number(),
    pageCount: z.number(),
    pageSize: z.number(),
    pageNumber: z.number(),
  });

  export const UnionFilterSchema = z.object({
    EmployeeCode: z.string().optional(),
    DateJoined: z.string().optional(),
    Title: z.string().optional(),
  });

export const UnionListRes = z.object({
    paging: UnionPageSchema,
    filter: UnionFilterSchema,
    value: z.object({
      data: z.array(UnionSchema),
    }),
    status: z.number(),
  });

export const CreateUnionSchema = z.object({
    employeeCode: z.string(),
    title: z.string(),
    dateJoined: z.string(),
  });

export const CreateUnionRes = z.object({
    status: z.number(),
    message: z.string(),
    log: z.string(),
  });

export const UpdateUnion = z.object({
    employeeCode:z.string(),
    title:z.string(),
    dateJoined:z.string(),
  });

export const UpdateUnionRes = z.object({
    status: z.number(),
    message: z.string(),
    log: z.string(),
  });

export type UnionSchemaType = z.infer<typeof UnionSchema>;
export type UnionPageSchemaType = z.infer<typeof UnionPageSchema>;
export type UnionFilterType = z.infer<typeof UnionFilterSchema>;
export type UnionListResType = z.infer<typeof UnionListRes>;
export type CreateUnionType = z.infer<typeof CreateUnionSchema>;
export type CreateUnionResType = z.infer<typeof CreateUnionRes>;
export type UpdateUnionType = z.infer<typeof UpdateUnion>;
export type UpdateUnionResType = z.infer<typeof UpdateUnionRes>;