
import { columns } from './columns'
import { DataTable } from './data-table'
import { Employee, EmployeeBaseResponse } from '../../../../new-types.d'
import apiEmployeeRequest from '@/apiRequest/employee'

async function fetchEmployees(): Promise<EmployeeBaseResponse> {
    try {
        const response = await apiEmployeeRequest.getListEmployee(1, 10, {});
        const employees = response.payload;
        
        return employees;
    } catch (error) {
        console.error("Failed to fetch employees 123", error);
        return { data: [], totalCount: 0, pageCount: 0, pageSize: 0, pageNumber: 0, isSuccess: false, isFailure: true, error: { code: '', message: '' } };
    }
}

export default async function EmployeeTable() {
    const employees = await fetchEmployees();
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={employees} />
        </div>
    )
}
