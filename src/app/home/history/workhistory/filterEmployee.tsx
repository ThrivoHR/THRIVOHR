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
import { TrainingHistoryFilterType } from "@/schemaValidation/trainingHistory.schema";

interface HistoryFilterProps {
  onFilter: (filter: TrainingHistoryFilterType) => void;
}

export default function HistoryFilter({ onFilter }: HistoryFilterProps) {
  const [filters, setFilters] = useState<TrainingHistoryFilterType>({
    EmployeeCode: "",
    Content: "",
    StartDay: "",
    WorkshopName: "",
    Status: 0,
  });

  const handleApplyFilter = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      EmployeeCode: "",
    Content: "",
    StartDay: "",
    WorkshopName: "",
    Status: 0,
    });
    onFilter({
      EmployeeCode: "",
    Content: "",
    StartDay: "",
    WorkshopName: "",
    Status: 0,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
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
              placeholder="Start Day"
              name="StartDay"
              value={filters.StartDay}
              onChange={handleChange}
            />
            <Input
              placeholder="Content"
              name="Content"
              value={filters.Content}
              onChange={handleChange}
            />
            <Input
              placeholder="Workshop Name"
              name="WorkshopName"
              value={filters.WorkshopName}
              onChange={handleChange}
            />
            <Input
              placeholder="Status"
              name="Status"
              value={filters.Status}
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
