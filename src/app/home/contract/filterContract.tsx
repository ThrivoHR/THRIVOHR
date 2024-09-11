"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ContractFilterType } from "@/schemaValidation/contract.schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ContractFilterProps {
  onFilter: (filter: ContractFilterType) => void;
}

export default function ContractFilter({ onFilter }: ContractFilterProps) {
  const [filters, setFilters] = useState<ContractFilterType>({
    EmployeeCode: "",
    StartDate: "",
    EndDate: "",
    Notes: "",
    Salary: undefined, // Use undefined instead of 0
    Department: undefined, // Use undefined instead of 0
    Position: undefined, // Use undefined instead of 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : value, // Handle empty fields correctly
    }));
  };

  const handleApplyFilter = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      EmployeeCode: "",
      StartDate: "",
      EndDate: "",
      Notes: "",
      Salary: undefined, // Reset to undefined
      Department: undefined, // Reset to undefined
      Position: undefined, // Reset to undefined
    });
    onFilter({
      EmployeeCode: "",
      StartDate: "",
      EndDate: "",
      Notes: "",
      Salary: undefined,
      Department: undefined,
      Position: undefined,
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
              placeholder="Start Date"
              type="date"
              name="StartDate"
              value={filters.StartDate}
              onChange={handleChange}
            />
            <Input
              placeholder="End Date"
              type="date"
              name="EndDate"
              value={filters.EndDate}
              onChange={handleChange}
            />
            <Input
              placeholder="Notes"
              name="Notes"
              value={filters.Notes}
              onChange={handleChange}
            />
            <Input
              placeholder="Salary"
              type="number"
              name="Salary"
              value={filters.Salary ?? ""} // Handle undefined by using an empty string
              onChange={handleChange}
            />
            <Input
              placeholder="Department"
              type="number"
              name="Department"
              value={filters.Department ?? ""} // Handle undefined by using an empty string
              onChange={handleChange}
            />
            <Input
              placeholder="Position"
              type="number"
              name="Position"
              value={filters.Position ?? ""} // Handle undefined by using an empty string
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
