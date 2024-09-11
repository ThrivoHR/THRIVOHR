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
    Salary: 0,
    Department: 0,
    Position: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === "Salary" && value === "" ? undefined : value,
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
      Salary: 0,
      Department: 0,
      Position: 0,
    });
    onFilter({
      EmployeeCode: "",
      StartDate: "",
      EndDate: "",
      Notes: "",
      Salary: 0,
      Department: 0,
      Position: 0,
    });
  };

  return (
    <Collapsible open>
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
              value={filters.Salary}
              onChange={handleChange}
            />
            <Input
              placeholder="Department"
              name="Department"
              value={filters.Department}
              onChange={handleChange}
            />
            <Input
              placeholder="Position"
              name="Position"
              value={filters.Position}
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
