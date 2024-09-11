"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmployeeFilterType } from "@/schemaValidation/employee.schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import apiPositionRequest from "@/apiRequest/position";
import apiDepartmentRequest from "@/apiRequest/department";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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

  const [positions, setPositions] = useState<{ [key: number]: string }>({});
  const [departments, setDepartments] = useState<{ [key: number]: string }>({});

  const getPos = async () => {
    const posData = await apiPositionRequest.getPosition();
    setPositions(posData.payload.value);
  };

  const getDept = async () => {
    const deptData = await apiDepartmentRequest.getDepartment();
    setDepartments(deptData.payload.value);
  };

  useEffect(() => {
    getPos();
    getDept();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }
  ) => {
    if ("target" in e) {
      const { name, value } = e.target;
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const { name, value } = e;
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    <Collapsible defaultOpen>
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

            <Select
              onValueChange={(value) =>
                handleChange({ name: "PositionId", value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    filters.PositionId === 0
                      ? "Select Position"
                      : positions[
                          filters.PositionId as keyof typeof positions
                        ] ?? "Unknown Position"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(positions).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                handleChange({ name: "DepartmentId", value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    filters.DepartmentId === 0
                      ? "Select Department"
                      : departments[
                          filters.DepartmentId as keyof typeof departments
                        ] ?? "Unknown Department"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(departments).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
