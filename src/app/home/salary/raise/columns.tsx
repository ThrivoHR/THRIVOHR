import { ColumnDef } from "@tanstack/react-table";
import { RaiseType, SalaryType } from "@/schemaValidation/salary.schema";
import dayjs from "dayjs";

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const columns = (
): ColumnDef<RaiseType>[] => [
  {
    accessorKey: "employeeCode",
    header: "Employee Code",
  },
  {
    accessorKey: "employeeFullName",
    header: "Employee Name",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => dayjs(row.original.date).format('DD/MM/YYYY'),
  },
  {
    accessorKey: "oldSalary",
    header: "Old Salary",
    cell: ({ getValue }) => currencyFormatter.format(getValue() as number),
  },
  {
    accessorKey: "newSalary",
    header: "New Salary",
    cell: ({ getValue }) => currencyFormatter.format(getValue() as number),
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
];
