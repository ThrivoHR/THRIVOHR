"use client";

import { ColumnDef } from "@tanstack/react-table"
import { Employee, EmployeeBaseResponse } from "../../../../new-types";


export const columns: ColumnDef<Employee>[] = [
    {
        header: "Employee Code",
        accessorKey: "employeeCode",
    },
    {
        header: "Full Name",
        accessorKey: "fullName",
    },
    {
        header: "Department",
        accessorKey: "department",
    },
    {
        header: "Position",
        accessorKey: "position",
    },
    {
        header: "Email",
        accessorKey: "email",
    },
    {
        header: "Identity Number",
        accessorKey: "identityNumber",
    },
    {
        header: "Phone Number",
        accessorKey: "phoneNumber",
    },
    {
        header: "Tax Code",
        accessorKey: "taxCode",
    },
    {
        header: "Bank Account",
        accessorKey: "bankAccount",
    },
    {
        header: "Address",
        accessorKey: "address",
    },
    {
        header: "Date Of Birth",
        accessorKey: "dateOfBirth",
    },
    {
        header: "Manager",
        accessorKey: "manager",
    }]


    
