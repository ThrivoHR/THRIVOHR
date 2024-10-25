import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { FaceSchemaType } from "@/schemaValidation/face.schema";

export const columns = (
): ColumnDef<FaceSchemaType>[] => [
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
    accessorKey: "checkIn",
    header: "Check-In",
    cell: ({ row }) => dayjs(row.original.checkIn).format('hh/mm/ss'),
  },
  {
    accessorKey: "checkOut",
    header: "Check-Out",
    cell: ({ row }) => dayjs(row.original.checkOut).format('hh/mm/ss'),
  },
  {
    accessorKey: "note",
    header: "Note",
  },
];
