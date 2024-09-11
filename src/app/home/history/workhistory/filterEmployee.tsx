"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TrainingHistoryFilterType } from "@/schemaValidation/trainingHistory.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: parseInt(value, 10), // Convert value to number for Status
    }));
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
              onChange={handleInputChange}
            />
            <Input
              placeholder="Start Day"
              name="StartDay"
              value={filters.StartDay}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Content"
              name="Content"
              value={filters.Content}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Workshop Name"
              name="WorkshopName"
              value={filters.WorkshopName}
              onChange={handleInputChange}
            />
            <Select
              onValueChange={(value) => handleSelectChange("Status", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status">
                  {filters.Status !== null && filters.Status !== undefined
                    ? filters.Status.toString()
                    : "Status"}{" "}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 5 }, (_, num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
