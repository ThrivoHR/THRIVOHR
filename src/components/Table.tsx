"use client";

import { ReactNode } from "react";
import { ThreeDots } from "@/components/icon";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface DataTableProps {
  columns: string[];
  data: Record<string, ReactNode>[];
  onEditClick: (row: Record<string, ReactNode>) => void;
  onDeleteClick: (row: Record<string, ReactNode>) => void;
}

export default function DataTable({
  columns,
  data,
  onEditClick,
  onDeleteClick,
}: DataTableProps) {
  const headerStyle = "text-black";

  return (
    <div className="flex-grow overflow-auto">
      <Table className="w-full">
        <TableHeader className="bg-blue-200/40 rounded-t-lg">
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column} className={headerStyle}>
                {column}
              </TableHead>
            ))}
            <TableHead className={headerStyle}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-gray-100">
              {columns.map((column) => (
                <TableCell key={column} className="font-medium">
                  {row[column]}
                </TableCell>
              ))}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <ThreeDots />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => onEditClick(row)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onDeleteClick(row)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
