"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ContractFilterType } from "@/schemaValidation/contract.schema";
import apiPositionRequest from "@/apiRequest/position";
import apiDepartmentRequest from "@/apiRequest/department";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Collapse } from "antd";
import { ApplicationFormFilterType } from "@/schemaValidation/applicationForm.schema";
import { FileDown, FileUp } from "lucide-react";
import { OvertimeFilterType } from "@/schemaValidation/overtime.schema";
interface OvertimeFilterProps {
  onFilter: (filter: OvertimeFilterType) => void;
}
const { Panel } = Collapse;
export default function OvertimeFilter({
  onFilter,
}: OvertimeFilterProps) {
  const [filters, setFilters] = useState<OvertimeFilterType>({
    EmployeeId: "",
    Amount: 0,
    Date: "",
    From: 0,
    To: 0,
    IsPaid: false,
    Reason: "",
    Status: 0,
  });

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
      EmployeeId: "",
      Amount: 0,
      Date: "",
      From: 0,
      To: 0,
      IsPaid: false,
      Reason: "",
      Status: 0,
    });
    onFilter({
      EmployeeId: "",
      Amount: 0,
      Date: "",
      From: 0,
      To: 0,
      IsPaid: false,
      Reason: "",
      Status: 0,
    });
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
              placeholder="Employee ID"
              name="EmployeeId"
              value={filters.EmployeeId}
              onChange={handleChange}
            />
            <Input
              type="date"
              placeholder="Date"
              name="Date"
              value={filters.Date}
              onChange={handleChange}
            />
            <Input
              placeholder="Amount"
              name="Amount"
              value={filters.Amount}
              onChange={handleChange}
            />
            <Input
              placeholder="From"
              name="From"
              value={filters.From}
              onChange={handleChange}
            />
            <Input
              placeholder="To"
              name="To"
              value={filters.To}
              onChange={handleChange}
            />
            <Input
              placeholder="Reason"
              name="Reason"
              value={filters.Reason}
              onChange={handleChange}
            />
            <Select
              name="Status"
              onValueChange={(value) =>
                handleChange({ name: "Status", value: value })
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
                <SelectItem value="3">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select
              name="Status"
              onValueChange={(value) =>
                handleChange({ name: "IsPaid", value: value })
              }
              value={filters.IsPaid?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select paid status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Pending</SelectItem>
                <SelectItem value="false">Approved</SelectItem>
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
                <FileUp size={16} />
                &nbsp; Import
              </Button>
              <Button className="bg-orange-400 hover:bg-orange-300">
                <FileDown size={16} />
                &nbsp; Export
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>
  );
}
