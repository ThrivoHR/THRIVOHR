import { BaseResponse } from "@/schemaValidation/baseResponse.schema";

export type Employee = {
    EmployeeCode: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    identityNumber: string;
    phoneNumber: string;
    taxCode: string;
    bankAccount: string;
    address: {
        id: number;
        addressLine: string;
        city: string;
        ward: string;
        district: string;
        country: string;
    };
    department: Department;
    position: Position;
    dateOfBirth: string;
    manager: string;




}
interface Base {
    id: number;
    name: string;
}
export type EmployeeBaseResponse = BaseResponse;
export type Department = Base;
export type Position = Base;