import z from 'zod'

export const LoginBody = z
  .object({
    employeeCode: z.string(),
    password: z.string()
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = z.object({
  value: z.object({
    token: z.string(),
    refreshToken: z.string()
  }),
  message: z.string()
})

export type LoginResType = z.TypeOf<typeof LoginRes>

export const SlideSessionBody = z.object({}).strict()

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>

export const SlideSessionRes = LoginRes

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>
