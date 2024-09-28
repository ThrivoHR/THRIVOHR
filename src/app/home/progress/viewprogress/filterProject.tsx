"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Collapse } from "antd";
import { FileDown, FileUp } from "lucide-react";
import { AbsentFormFilterType } from "@/schemaValidation/absentForm.schema";
import { ProjectFilterSchemaType } from "@/schemaValidation/project.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectFilterProps {
  onFilter: (filter: ProjectFilterSchemaType) => void;
}
const { Panel } = Collapse;
export default function ProjectFilter({ onFilter }: ProjectFilterProps) {
  const [filters, setFilters] = useState<ProjectFilterSchemaType>({
    LeaderName: "",
    Name: "",
    ProjectId: "",
    Status: 0,
    SubLeaderName: "",
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
      LeaderName: "",
      Name: "",
      ProjectId: "",
      Status: 0,
      SubLeaderName: "",
    });
    onFilter({
      LeaderName: "",
      Name: "",
      ProjectId: "",
      Status: 0,
      SubLeaderName: "",
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
              placeholder="Name"
              name="Name"
              value={filters.Name}
              onChange={handleChange}
            />
            <Input
              placeholder="Project Id"
              name="ProjectId"
              value={filters.ProjectId}
              onChange={handleChange}
            />
            <Input
              placeholder="Leader Name"
              name="LeaderName"
              value={filters.LeaderName}
              onChange={handleChange}
            />
            <Input
              placeholder="Sub Leader Name"
              name="SubLeaderName"
              value={filters.SubLeaderName}
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
