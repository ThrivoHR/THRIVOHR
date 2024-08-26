import z from "zod";

export const EmployeeSchema = z.object({
  employeeCode: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string(),
  identityNumber: z.string(),
  phoneNumber: z.string(),
  taxCode: z.string(),
  bankAccount: z.string(),
  address: z.object({
    id: z.number(),
    addressLine: z.string(),
    ward: z.string(),
    district: z.string(),
    city: z.string(),
    country: z.string(),
    fullAddress: z.string(),
  }),
  department: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
  }),
  position: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
  }),
  dateOfBirth: z.string(),
});

export const EmployeePageSchema = z.object({
  totalCount: z.number(),
  pageCount: z.number(),
  pageSize: z.number(),
  pageNumber: z.number(),
});

export const EmployeeFilterSchema = z.object({
  EmployeeCode: z.string().optional(),
  Email: z.string().optional(),
  FirstName: z.string().optional(),
  LastName: z.string().optional(),
  FullName: z.string().optional(),
  PhoneNumber: z.string().optional(),
  IdentityNumber: z.string().optional(),
  TaxCode: z.string().optional(),
  BankAccount: z.string().optional(),
  Address: z.string().optional(),
  DateOfBirth: z.string().optional(),
  DepartmentId: z.number().optional(),
  PositionId: z.number().optional(),
});

export const EmployeeListRes = z.object({
  paging: EmployeePageSchema,
  filter: EmployeeFilterSchema,
  value: z.object({
    data: z.array(EmployeeSchema),
  }),
  status: z.number(),
});

export const CreateEmployee = z.object({
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string(),
  identityNumber: z.string(),
  phoneNumber: z.string(),
  taxCode: z.string(),
  bankAccount: z.string(),
  address: z.object({
    addressLine: z.string(),
    ward: z.string(),
    district: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  dateOfBirth: z.string(),
});

export const CreateEmployeeRes = z.object({
  status: z.number(),
  message: z.string(),
  log: z.string(),
});

export const UpdateEmployee = z.object({
  employeeCode: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string(),
  identityNumber: z.string(),
  phoneNumber: z.string(),
  taxCode: z.string(),
  bankAccount: z.string(),
  address: z.object({
    id: z.number(),
    addressLine: z.string(),
    ward: z.string(),
    district: z.string(),
    city: z.string(),
    country: z.string(),
    fullAddress: z.string(),
  }),
  dateOfBirth: z.date(),
  departmentId: z.number(),
  positionId: z.number(),
});

export const UpdateEmployeeRes = z.object({
  status: z.number(),
  message: z.string(),
});

export const DeleteEmployee = z.object({
  employeeCode: z.string()
})

export const DeleteEmployeeRes = z.object({
  status: z.number(),
  message: z.string(),
});

export type EmployeeSchemaType = z.TypeOf<typeof EmployeeSchema>;
export type EmployeeListResType = z.TypeOf<typeof EmployeeListRes>;
export type EmployeeFilterType = z.TypeOf<typeof EmployeeFilterSchema>;
export type CreateEmployeeResType = z.TypeOf<typeof CreateEmployeeRes>;
export type CreateEmployeeType = z.TypeOf<typeof CreateEmployee>;
export type UpdateEmployeeResType = z.TypeOf<typeof UpdateEmployeeRes>;
export type UpdateEmployeeType = z.TypeOf<typeof UpdateEmployee>;

export type DeleteEmployeeResType = z.TypeOf<typeof DeleteEmployeeRes>;
export type DeleteEmployeeType = z.TypeOf<typeof DeleteEmployee>;

