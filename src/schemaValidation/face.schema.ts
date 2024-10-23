import { z } from "zod";


export const FaceSchema = z.object({
    employeeName: z.string(),
    date: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    note: z.string(),
  });

  export const FacePageSchema = z.object({
    totalCount: z.number(),
    pageCount: z.number(),
    pageSize: z.number(),
    pageNumber: z.number(),
  });

  export const FaceListRes = z.object({
    paging: FacePageSchema,
    value: z.object({
      data: z.array(FaceSchema),
    }),
    status: z.number(),
  });

  



export type FaceSchemaType = z.infer<typeof FaceSchema>;
export type FacePageSchemaType = z.infer<typeof FacePageSchema>;
export type FaceListResType = z.infer<typeof FaceListRes>;
