"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ContractFilterType } from "@/schemaValidation/contract.schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import apiPositionRequest from "@/apiRequest/position";
import apiDepartmentRequest from "@/apiRequest/department";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface ContractFilterProps {
  onFilter: (filter: ContractFilterType) => void;
}

export default function ContractFilter({ onFilter }: ContractFilterProps) {
  const [filters, setFilters] = useState<ContractFilterType>({
    EmployeeCode: "",
    StartDate: "",
    EndDate: "",
    Notes: "",
    Salary: undefined, 
    Department: 0,
    Position: 0,
    EmployeeName: "",
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
      StartDate: "",
      EndDate: "",
      Notes: "",
      Salary: undefined,
      Department: 0,
      Position: 0, 
      EmployeeName: "",
    });
    onFilter({
      EmployeeCode: "",
      StartDate: "",
      EndDate: "",
      Notes: "",
      Salary: undefined,
      Department: 0,
      Position: 0,
      EmployeeName: "",
    });
  };

  return (
    <Accordion
      type="single"
      collapsible
      onValueChange={(value) => setIsOpen(!!value)}
      defaultValue="filter"
    >
      <AccordionItem value="filter">
        <AccordionTrigger className=" rounded-md border items-center justify-start py-2">&nbsp; Search information &nbsp;</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-4 mb-6 p-4 border rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                placeholder="Employee Code"
                name="EmployeeCode"
                value={filters.EmployeeCode}
                onChange={handleChange}
              />
              <Input
                placeholder="Employee Name"
                name="EmployeeName"
                value={filters.EmployeeName}
                onChange={handleChange}/>
              <Input
                placeholder="Start Date"
                type="date"
                name="StartDate"
                value={filters.StartDate}
                onChange={handleChange}
              />
              <Input
                placeholder="End Date"
                type="date"
                name="EndDate"
                value={filters.EndDate}
                onChange={handleChange}
              />
              <Input
                placeholder="Notes"
                name="Notes"
                value={filters.Notes}
                onChange={handleChange}
              />
              <Input
                placeholder="Salary"
                type="number"
                name="Salary"
                value={filters.Salary ?? ""}
                onChange={handleChange}
              />
              <Select
                onValueChange={(value) =>
                  handleChange({ name: "Position", value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      filters.Position === 0
                        ? "Select Position"
                        : positions[
                            filters.Position as keyof typeof positions
                          ] ?? "Unknown Position"
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
                  handleChange({ name: "Department", value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      filters.Department === 0
                        ? "Select Department"
                        : departments[
                            filters.Department as keyof typeof departments
                          ] ?? "Unknown Department"
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
            </div>
            <div className="flex justify-start space-x-2 mt-2">
              <Button variant="outline" onClick={handleReset}>
                Clear filter
              </Button>
              <Button onClick={handleApplyFilter}><MagnifyingGlassIcon/>&nbsp;Search</Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
