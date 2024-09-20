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
import { UnionFilterType } from "@/schemaValidation/union.schema";

interface UnionFilterProps {
  onFilter: (filter: UnionFilterType) => void;
}

const { Panel } = Collapse;
export default function UnionFilter({ onFilter }: UnionFilterProps) {
  const [filters, setFilters] = useState<UnionFilterType>({
    EmployeeCode: "",
    Title: "",
    DateJoined: "",
  });

  const handleApplyFilter = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      EmployeeCode: "",
      Title: "",
      DateJoined: "",
    });
    onFilter({
      EmployeeCode: "",
      Title: "",
      DateJoined: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSelectChange = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
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
              placeholder="Title"
              name="Title"
              value={filters.Title}
              onChange={handleInputChange}/>

            <Input
              placeholder="Date Joined"
              type="date"
              name="DateJoined"
              value={filters.DateJoined}
              onChange={handleInputChange}/>

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
