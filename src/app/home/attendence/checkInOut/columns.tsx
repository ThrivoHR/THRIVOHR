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
  },
  {
    accessorKey: "checkOut",
    header: "Check-Out",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
];
