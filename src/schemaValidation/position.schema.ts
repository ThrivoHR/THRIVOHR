import { z } from "zod";

export const PositionListRes = z.object({
  value: z.record(z.string()), 
  isSuccess: z.boolean(),
  isFailure: z.boolean(),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

// Type inference using z.infer
export type PositionListResType = z.infer<typeof PositionListRes>;
