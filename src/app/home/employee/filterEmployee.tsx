"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmployeeFilterType } from "@/schemaValidation/employee.schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface EmployeeFilterProps {
  onFilter: (filter: EmployeeFilterType) => void;
}

export default function EmployeeFilter({ onFilter }: EmployeeFilterProps) {
  const [filters, setFilters] = useState<EmployeeFilterType>({
    EmployeeCode: "",
    Email: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    DepartmentId: 0,
    PositionId: 0,
    BankAccount: "",
    Address: "",
    FullName: "",
    IdentityNumber: "",
    TaxCode: "",
    DateOfBirth: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilter = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      EmployeeCode: "",
      Email: "",
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      DepartmentId: 0,
      PositionId: 0,
      BankAccount: "",
      Address: "",
      FullName: "",
      IdentityNumber: "",
      TaxCode: "",
      DateOfBirth: "",
    });
    onFilter({
      EmployeeCode: "",
      Email: "",
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      DepartmentId: 0,
      PositionId: 0,
      BankAccount: "",
      Address: "",
      FullName: "",
      IdentityNumber: "",
      TaxCode: "",
      DateOfBirth: "",
    });
  };

  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full">
        <Button variant="outline" className="w-full">
          Filter
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col space-y-4 mb-6 p-4 border rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              placeholder="Employee Code"
              name="EmployeeCode"
              value={filters.EmployeeCode}
              onChange={handleChange}
            />
            <Input
              placeholder="Email"
              name="Email"
              value={filters.Email}
              onChange={handleChange}
            />
            <Input
              placeholder="First Name"
              name="FirstName"
              value={filters.FirstName}
              onChange={handleChange}
            />
            <Input
              placeholder="Last Name"
              name="LastName"
              value={filters.LastName}
              onChange={handleChange}
            />
            <Input
              placeholder="Phone Number"
              name="PhoneNumber"
              value={filters.PhoneNumber}
              onChange={handleChange}
            />
            <Input
              placeholder="Bank Account"
              name="BankAccount"
              value={filters.BankAccount}
              onChange={handleChange}
            />
            <Input
              placeholder="Address"
              name="Address"
              value={filters.Address}
              onChange={handleChange}
            />
            <Input
              placeholder="Full Name"
              name="FullName"
              value={filters.FullName}
              onChange={handleChange}
            />
            <Input
              placeholder="Identity Number"
              name="IdentityNumber"
              value={filters.IdentityNumber}
              onChange={handleChange}
            />
            <Input
              placeholder="Tax Code"
              name="TaxCode"
              value={filters.TaxCode}
              onChange={handleChange}
            />

            <Input
              placeholder="Date of Birth"
              type="date"
              name="DateOfBirth"
              value={filters.DateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleApplyFilter}>Apply Filter</Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
