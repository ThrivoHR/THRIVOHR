import { TrainingHistorySchemaType } from "@/schemaValidation/trainingHistory.schema";
import { ColumnDef } from "@tanstack/react-table";
import { SalaryType } from "@/schemaValidation/salary.schema";
import dayjs from "dayjs";

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const columns = (
): ColumnDef<SalaryType>[] => [
  {
    accessorKey: "employeeCode",
    header: "Employee Code",
  },
  {
    accessorKey: "employeeName",
    header: "Employee Name",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => dayjs(row.original.date).format('DD/MM/YYYY'),
  },
  {
    accessorKey: "basicSalary",
    header: "Basic Salary",
    cell: ({ getValue }) => currencyFormatter.format(getValue() as number),
  },
  {
    accessorKey: "socialInsurance",
    header: "Social Insurance",
    cell: ({ getValue }) => currencyFormatter.format(getValue() as number),
  },
  {
    accessorKey: "healthInsurance",
    header: "Health Insurance",
    cell: ({ getValue }) => currencyFormatter.format(getValue() as number),
  },
  {
    accessorKey: "unemploymentInsurance",
    header: "Unemployment Insurance",
    cell: ({ getValue }) => currencyFormatter.format(getValue() as number),
  },
  {
    accessorKey: "totalIncomeBeforeTax",
    header: "Total Income Before Tax",
    cell: ({ getValue }) => currencyFormatter.format(getValue() as number),
  },
  {
    accessorKey: "taxableIncome",
    header: "Taxable Income",
    cell: ({ getValue }) => currencyFormatter.format(getValue() as number),
  },
  {
    accessorKey: "personalIncomeTax",
    header: "Personal Income Tax",
    cell: ({ getValue }) => currencyFormatter.format(getValue() as number),
  },
  {
    accessorKey: "netIncome",
    header: "Net Income",
    cell: ({ getValue }) => currencyFormatter.format(getValue() as number),
  },
];
