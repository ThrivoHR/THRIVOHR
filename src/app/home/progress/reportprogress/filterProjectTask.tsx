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
import { ProjectTaskFilterType } from "@/schemaValidation/projectTask.schema";

interface ProjectTaskFilterProps {
  onFilter: (filter: ProjectTaskFilterType) => void;
}
const { Panel } = Collapse;
export default function ProjectTaskFilter({ onFilter }: ProjectTaskFilterProps) {
  const [filters, setFilters] = useState<ProjectTaskFilterType>({
    ProjectId: "",
    TaskId: "",
    TaskName: "",
    TaskDescription: "",
    TaskStatus: 0,
    AssigneeName: "",
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
      ProjectId: "",
    TaskId: "",
    TaskName: "",
    TaskDescription: "",
    TaskStatus: 0,
    AssigneeName: "",
    Status: 0,
    });
    onFilter({
      ProjectId: "",
    TaskId: "",
    TaskName: "",
    TaskDescription: "",
    TaskStatus: 0,
    AssigneeName: "",
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
              placeholder="Assignee Name"
              name="AssigneeName"
              value={filters.AssigneeName}
              onChange={handleChange}
            />
            <Input
              placeholder="Project Id"
              name="ProjectId"
              value={filters.ProjectId}
              onChange={handleChange}
            />
            <Input
              placeholder="Task Id" 
              name="TaskId"
              value={filters.TaskId}
              onChange={handleChange}
            />
            <Input
              placeholder="Task Name"
              name="TaskName"
              value={filters.TaskName}
              onChange={handleChange}
            />
            <Input
              placeholder="Task Description"
              name="TaskDescription"
              value={filters.TaskDescription}
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
                <SelectItem value="0">Not Started</SelectItem>
                <SelectItem value="1">Completed</SelectItem>
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
