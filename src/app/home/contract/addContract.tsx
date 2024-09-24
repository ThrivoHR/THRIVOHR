"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import apiEmployeeRequest from "@/apiRequest/employee";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleErrorApi } from "@/lib/utils";
import { CreateContractType } from "@/schemaValidation/contract.schema";
import apiContractRequest from "@/apiRequest/contract";
import apiPositionRequest from "@/apiRequest/position";
import apiDepartmentRequest from "@/apiRequest/department";
import toast from "react-hot-toast";

interface AddContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contractSchema = z.object({
  departmentId: z.number(),
  positionId: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  notes: z.string(),
  salary: z.number(),
  employeeCode: z.string(),
});

export function AddContractModal({ isOpen, onClose }: AddContractModalProps) {
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState<{ [key: number]: string }>({});
  const [departments, setDepartments] = useState<{ [key: number]: string }>({});

  const form = useForm<CreateContractType>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      departmentId: 0,
      positionId: 0,
      startDate: "",
      endDate: "",
      notes: "",
      salary: 0,
      employeeCode: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ positionsData, departmentsData] = await Promise.all([
          apiPositionRequest.getPosition(),
          apiDepartmentRequest.getDepartment(),
        ]);
        setPositions(positionsData.payload.value);
        setDepartments(departmentsData.payload.value);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (data: CreateContractType) => {
    setLoading(true);
    try {
      const result = await apiContractRequest.createContract(data);
      toast.success("Contract added successfully!");
      console.log(result);
      onClose();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || "Contract addition failed";
      handleErrorApi({
        error,
        setError: form.setError,
      });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (name: string, value: string | number) => {
    form.setValue(name as keyof CreateContractType, value);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[900px] max-w-6xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Contract</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to add a new contract.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAdd)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select
                onValueChange={(value) =>
                  handleChange("departmentId", parseInt(value))
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        form.getValues("departmentId") === 0
                          ? "Select Department"
                          : departments[
                              form.getValues("departmentId") as keyof typeof departments
                            ] ?? "Unknown Department"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(departments).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>{form.formState.errors.departmentId?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select
                onValueChange={(value) =>
                  handleChange("positionId", parseInt(value))
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        form.getValues("positionId") === 0
                          ? "Select Position"
                          : positions[
                              form.getValues("positionId") as keyof typeof positions
                            ] ?? "Unknown Position"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(positions).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>{form.formState.errors.positionId?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...form.register("salary", { valueAsNumber: true })}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.salary?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("startDate")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.startDate?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("endDate")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.endDate?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input
                  {...form.register("notes")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.notes?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Employee</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeCode")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.employeeCode?.message}</FormMessage>
            </FormItem>

            <AlertDialogFooter className="col-span-3">
              <AlertDialogCancel onClick={onClose} className="mr-2">
                Cancel
              </AlertDialogCancel>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}