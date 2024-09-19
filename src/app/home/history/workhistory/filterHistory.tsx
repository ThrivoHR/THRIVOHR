"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrainingHistoryFilterType } from "@/schemaValidation/trainingHistory.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Collapse } from "antd";
import { FileDown, FileUp } from "lucide-react";

interface HistoryFilterProps {
  onFilter: (filter: TrainingHistoryFilterType) => void;
}

const statusOptions = [
  { label: "Completed", value: 0 },
  { label: "In Progress", value: 1 },
  { label: "Failed", value: 2 },
  { label: "Not Started", value: 3 },
];

const { Panel } = Collapse;
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

  const handleSelectChange = (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      Status: parseInt(value, 10),
    }));
  };

  return (
    <Collapse
      defaultActiveKey={["1"]}
      size="small"
      style={{ width: "100%", marginBottom: "10px" }}
    >
      <Panel header="Search Information" key="1">
        <div style={{ padding: "6px 0" }}>
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
              onValueChange={handleSelectChange}
              value={filters.Status?.toString()}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {statusOptions.find(
                    (option) => option.value === filters.Status
                  )?.label || "Status"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between mt-3">
            <div className="space-x-2">
              <Button variant="outline" onClick={handleReset}>
                Clear Filter
              </Button>
              <Button onClick={handleApplyFilter}>
                <MagnifyingGlassIcon />
                &nbsp;Search
              </Button>
            </div>
            <div className="space-x-2">
              <Button className="bg-green-400 hover:bg-green-300">
              <FileUp size={16} />&nbsp;
                Import
              </Button>
              <Button className="bg-orange-400 hover:bg-orange-300">
              <FileDown size={16} />&nbsp;
                Export
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>
  );
}
