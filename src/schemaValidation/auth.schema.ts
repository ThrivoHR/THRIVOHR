import z from 'zod'

export const LoginBody = z
  .object({
    employeeCode: z.string(),
    password: z.string()
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string()
    })
  }),
  message: z.string()
})

export type LoginResType = z.TypeOf<typeof LoginRes>

export const SlideSessionBody = z.object({}).strict()

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>

export const SlideSessionRes = LoginRes

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>
