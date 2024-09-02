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
  const [employees, setEmployees] = useState<{ employeeCode: string }[]>([]);

  const form = useForm<CreateContractType>({
    resolver: zodResolver(contractSchema),
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const data = await apiEmployeeRequest.getListEmployee(1, 500, {});
        setEmployees(data.payload.value.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleAdd = async (data: CreateContractType) => {
    setLoading(true);
    try {
      const result = await apiContractRequest.createContract(data);
      console.log(result);
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
      onClose();
    }
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
              <FormControl>
                <Input
                  {...form.register("departmentId", { valueAsNumber: true })}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.departmentId?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input
                  {...form.register("positionId", { valueAsNumber: true })}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.positionId?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input
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
              <FormMessage>
                {form.formState.errors.startDate?.message}
              </FormMessage>
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
              <FormMessage>
                {form.formState.errors.endDate?.message}
              </FormMessage>
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
            
            {/* employeeCode */}
            <FormItem>
              <FormLabel>Employee Code</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) =>
                    form.setValue("employeeCode", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Employee Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem
                        key={employee.employeeCode}
                        value={employee.employeeCode}
                      >
                        {" "}
                        {employee.employeeCode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeCode?.message}
              </FormMessage>
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
