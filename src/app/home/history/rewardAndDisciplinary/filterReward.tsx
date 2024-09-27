"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RewardAndDisciplinaryFilterType } from "@/schemaValidation/rewardAndDisciplinary.schema";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Collapse } from "antd";
import { FileDown, FileUp } from "lucide-react";
import toast from "react-hot-toast";

interface EmployeeFilterProps {
  onFilter: (filter: RewardAndDisciplinaryFilterType) => void;
}

const { Panel } = Collapse;

export default function EmployeeFilter({ onFilter }: EmployeeFilterProps) {
  const [filters, setFilters] = useState<RewardAndDisciplinaryFilterType>({
    EmployeeCode: "",
    FormOfAction: 0,
    IsRewards: false,
    Status: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { name: string; value: any }
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
    const resetFilters = {
      EmployeeCode: "",
      FormOfAction: 0,
      IsRewards: false,
      Status: 0,
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      toast.success("File imported successfully");
    }
  };

  const handleExportClick = () => {
    // Handle export logic here
    toast.success("File exported successfully");
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
              onChange={handleChange}
            />

            {/* Select for isRewards */}
            <Select
              name="IsRewards"
              onValueChange={(value) =>
                handleChange({ name: "IsRewards", value: value === "true" })
              }
              value={filters.IsRewards?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Reward Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Rewards</SelectItem>
                <SelectItem value="false">Disciplinary</SelectItem>
              </SelectContent>
            </Select>

            {/* Select for FormOfAction */}
            <Select
              name="FormOfAction"
              onValueChange={(value) =>
                handleChange({ name: "FormOfAction", value: Number(value) })
              }
              value={filters.FormOfAction?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Form of Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Action 0</SelectItem>
                <SelectItem value="1">Action 1</SelectItem>
                <SelectItem value="2">Action 2</SelectItem>
                <SelectItem value="3">Action 3</SelectItem>
                <SelectItem value="4">Action 4</SelectItem>
                <SelectItem value="5">Action 5</SelectItem>
                <SelectItem value="6">Action 6</SelectItem>
                <SelectItem value="7">Action 7</SelectItem>
              </SelectContent>
            </Select>

            {/* Select for Status */}
            <Select
              name="Status"
              onValueChange={(value) =>
                handleChange({ name: "Status", value: Number(value) })
              }
              value={filters.Status?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Pending</SelectItem>
                <SelectItem value="1">Approved</SelectItem>
                <SelectItem value="2">Rejected</SelectItem>
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
              <Button
                className="bg-green-400 hover:bg-green-300"
                onClick={handleImportClick}
              >
                <FileUp size={16} />
                &nbsp;Import
              </Button>

              <Button
                className="bg-orange-400 hover:bg-orange-300"
                onClick={handleExportClick}
              >
                <FileDown size={16} />
                &nbsp;Export
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>
  );
}
