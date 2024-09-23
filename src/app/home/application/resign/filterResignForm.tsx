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
import { ResignFormFilterType } from "@/schemaValidation/resignForm.schema";
import { FileDown, FileUp } from "lucide-react";

interface ResignFormFilterProps {
  onFilter: (filter: ResignFormFilterType) => void;
}
const { Panel } = Collapse;
export default function ResignFormFilter({ onFilter }: ResignFormFilterProps) {
  const [filters, setFilters] = useState<ApplicationFormFilterType>({
    FullName: "",
  });
  //   const posData = await apiPositionRequest.getPosition();
  //   setPositions(posData.payload.value);
  // };

  // const getDept = async () => {
  //   const deptData = await apiDepartmentRequest.getDepartment();
  //   setDepartments(deptData.payload.value);
  // };

  // useEffect(() => {
  //   getPos();
  //   getDept();
  // }, []);

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
      FullName: "",
    });
    onFilter({
      FullName: "",
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
              placeholder="Full Name"
              name="FullName"
              value={filters.FullName}
              onChange={handleChange}
            />
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
