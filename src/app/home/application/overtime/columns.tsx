import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { OvertimeType } from "@/schemaValidation/overtime.schema";
import dayjs from "dayjs";

export const Columns = (
): ColumnDef<OvertimeType>[] => [
  {
    accessorKey: "employeeId",
    header: "Employee ID",
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
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
