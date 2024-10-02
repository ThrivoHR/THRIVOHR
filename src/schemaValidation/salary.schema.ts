import { z } from "zod";


export const SalarySchema = z.object({
    employeeCode: z.string(),
    employeeName: z.string(),
    date: z.string(),
    basicSalary: z.number(),
    allowance: z.number(),
    bonus: z.number(),
    socialInsurance: z.number(),
    healthInsurance: z.number(),
    unemploymentInsurance: z.number(),
    totalIncomeBeforeTax:z.number(),
    personalDeduction: z.number(),
    numberOfDependants: z.number(),
    taxableIncome: z.number(),
    personalIncomeTax: z.number(),
    otherDeductions: z.number(),
    netIncome: z.number(),
  });

export const SalaryPageSchema = z.object({
    totalCount: z.number(),
    pageCount: z.number(),
    pageSize: z.number(),
    pageNumber: z.number(),
  });

export const SalaryFilterSchema = z.object({
    EmployeeCode: z.string().optional(),
    EmployeeName: z.string().optional(),
  });

export const SalaryListRes = z.object({
    paging: SalaryPageSchema,
    filter: SalaryFilterSchema,
    value: z.object({
      data: z.array(SalarySchema),
    }),
    status: z.number(),
  });

export type SalaryType = z.infer<typeof SalarySchema>;
export type SalaryPageType = z.infer<typeof SalaryPageSchema>;
export type SalaryFilterType = z.infer<typeof SalaryFilterSchema>;
export type SalaryListResType = z.infer<typeof SalaryListRes>;