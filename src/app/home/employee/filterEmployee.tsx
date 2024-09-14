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
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Collapse } from "antd";

interface EmployeeFilterProps {
  onFilter: (filter: EmployeeFilterType) => void;
}
const { Panel } = Collapse;

export default function EmployeeFilter({ onFilter }: EmployeeFilterProps) {
  const [filters, setFilters] = useState<EmployeeFilterType>({
    EmployeeCode: "",
    Email: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    DepartmentId: 0,
    PositionId: 0,
    BankAccount: "",
    Address: "",
    FullName: "",
    IdentityNumber: "",
    TaxCode: "",
    DateOfBirth: "",
  });

  const [positions, setPositions] = useState<{ [key: number]: string }>({});
  const [departments, setDepartments] = useState<{ [key: number]: string }>({});
  const [isOpen, setIsOpen] = useState(false);

  const getPos = async () => {
    const posData = await apiPositionRequest.getPosition();
    setPositions(posData.payload.value);
  };

  const getDept = async () => {
    const deptData = await apiDepartmentRequest.getDepartment();
    setDepartments(deptData.payload.value);
  };

  useEffect(() => {
    getPos();
    getDept();
  }, []);

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
      EmployeeCode: "",
      Email: "",
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      DepartmentId: 0,
      PositionId: 0,
      BankAccount: "",
      Address: "",
      FullName: "",
      IdentityNumber: "",
      TaxCode: "",
      DateOfBirth: "",
    });
    onFilter({
      EmployeeCode: "",
      Email: "",
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      DepartmentId: 0,
      PositionId: 0,
      BankAccount: "",
      Address: "",
      FullName: "",
      IdentityNumber: "",
      TaxCode: "",
      DateOfBirth: "",
    });
  };

  return (
<Collapse defaultActiveKey={["1"]} size="small" style={{ width: "100%", marginBottom: "10px" }}>
  <Panel header="Search Information" key="1">
    <div style={{ padding: "6px 0" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          placeholder="First Name"
          name="FirstName"
          value={filters.FirstName}
          onChange={handleChange}
        />
        <Input
          placeholder="Last Name"
          name="LastName"
          value={filters.LastName}
          onChange={handleChange}
        />
        <Input
          placeholder="Full Name"
          name="FullName"
          value={filters.FullName}
          onChange={handleChange}
        />
        <Input
          placeholder="Employee Code"
          name="EmployeeCode"
          value={filters.EmployeeCode}
          onChange={handleChange}
        />
        <Input
          placeholder="Email"
          name="Email"
          value={filters.Email}
          onChange={handleChange}
        />
        <Input
          placeholder="Phone Number"
          name="PhoneNumber"
          value={filters.PhoneNumber}
          onChange={handleChange}
        />

        <Select
          onValueChange={(value) =>
            handleChange({ name: "PositionId", value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                filters.PositionId === 0
                  ? "Select Position"
                  : positions[filters.PositionId as keyof typeof positions] ??
                    "Unknown Position"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(positions).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            handleChange({ name: "DepartmentId", value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                filters.DepartmentId === 0
                  ? "Select Department"
                  : departments[filters.DepartmentId as keyof typeof departments] ??
                    "Unknown Department"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(departments).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Address"
          name="Address"
          value={filters.Address}
          onChange={handleChange}
        />

        <Input
          placeholder="Date of Birth"
          type="date"
          name="DateOfBirth"
          value={filters.DateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between mt-3">
        <div className="space-x-2">
          <Button variant="outline" onClick={handleReset}>
            Clear Filter
          </Button>
          <Button onClick={handleApplyFilter}>
          <MagnifyingGlassIcon/>&nbsp;Search
          </Button>
        </div>
        <div className="space-x-2">
          <Button className="bg-green-400 hover:bg-green-300">
            Import
          </Button>
          <Button className="bg-orange-400 hover:bg-orange-300">
            Export
          </Button>
        </div>
      </div>
    </div>
  </Panel>
</Collapse>

  );
}
