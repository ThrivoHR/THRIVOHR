import z from "zod";

export const ContractSchema = z.object({
  id:z.string(),
  employeeCode: z.string(),
  department: z.string(),
  position: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  duration: z.number(),
  isNoExpiry: z.boolean(),
  notes:z.string(),
  salary: z.number(),
});

export const ContractPageSchema = z.object({
  totalCount: z.number(),
  pageCount: z.number(),
  pageSize: z.number(),
  pageNumber: z.number(),
});

export const ContractFilterSchema = z.object({
  EmployeeCode: z.string().optional(),
  StartDate: z.string().optional(),
  EndDate: z.string().optional(),
  Notes: z.string().optional(),
  Salary: z.number().optional(),
  Department: z.number().optional(),
  Position: z.number().optional(),
});

export const ContractListRes = z.object({
  paging: ContractPageSchema,
  filter: ContractFilterSchema,
  value: z.object({
    data: z.array(ContractSchema),
  }),
  status: z.number(),
});

export const CreateContract = z.object({
  departmentId: z.number(),
  positionId: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  notes: z.string(),
  salary: z.string(),
  employeeCode: z.string(),
});

export const CreateContractRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
});

export const UpdateContract = z.object({
  employeeContractModel: z.object({
    departmentId: z.number(),
    positionId: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    notes: z.string(),
    salary: z.number(),
    contractId: z.string(),
  }),
});

export const UpdateContractRes = z.object({
  status: z.number(),
  message: z.string(),
});

export const EndContract = z.object({
  contractId: z.string(),
});

export const EndContractRes = z.object({
  status: z.number(),
  message: z.string(),
});

export type ContractSchemaType = z.TypeOf<typeof ContractSchema>;
export type ContractListResType = z.TypeOf<typeof ContractListRes>;
export type ContractFilterType = z.TypeOf<typeof ContractFilterSchema>;
export type ContractPageSchemaType = z.TypeOf<typeof ContractPageSchema>;
export type CreateContractType = z.TypeOf<typeof CreateContract>;
export type CreateContractResType = z.TypeOf<typeof CreateContractRes>;
export type UpdateContractType = z.TypeOf<typeof UpdateContract>;
export type UpdateContractResType = z.TypeOf<typeof UpdateContractRes>;
export type EndContractType = z.TypeOf<typeof EndContract>;
export type EndContractResType = z.TypeOf<typeof EndContractRes>;
