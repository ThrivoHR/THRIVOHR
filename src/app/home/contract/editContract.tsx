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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { handleErrorApi } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UpdateContractType } from "@/schemaValidation/contract.schema";
import apiContractRequest from "@/apiRequest/contract";
import apiDepartmentRequest from "@/apiRequest/department";
import apiPositionRequest from "@/apiRequest/position";
import toast from "react-hot-toast";

interface EditContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractData: UpdateContractType;
  contractId: string;
}

const editContractSchema = z.object({
  employeeContractModel: z.object({
    departmentId: z.number(),
    positionId: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    notes: z.string(),
    salary: z.number(),
    contractId: z.string()
  }),
});

export function EditContractModal({
  isOpen,
  onClose,
  contractData,
  contractId,
}: EditContractModalProps) {
  const [departments, setDepartments] = useState<{ [key: number]: string }>({});
  const [positions, setPositions] = useState<{ [key: number]: string }>({});

  const form = useForm<UpdateContractType>({
    resolver: zodResolver(editContractSchema),
    defaultValues: contractData,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departmentData, positionData] = await Promise.all([
          apiDepartmentRequest.getDepartment(),
          apiPositionRequest.getPosition(),
        ]);
        setDepartments(departmentData.payload.value);
        setPositions(positionData.payload.value);
      } catch (error) {
        console.error("Error fetching departments and positions:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (data: UpdateContractType) => {
    console.log("Submitting form with data:", data);
    try {
      const updatedData = {
        ...data,
        employeeContractModel: {
          ...data.employeeContractModel,
          departmentId: Number(data.employeeContractModel.departmentId),
          positionId: Number(data.employeeContractModel.positionId),
        },
      };
      
      const result = await apiContractRequest.updateContract(contractId, updatedData);
      toast.success("Contract edited successfully!");
      console.log(result);
      onClose();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || "Contract editing failed";
      handleErrorApi({
        error,
        setError: form.setError,
      });
      toast.error(errorMessage);
    }
  };
  
  
  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      form.reset(contractData);
    }
  }, [isOpen, contractData, form]);

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="w-[900px] max-w-6xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Contract Information</AlertDialogTitle>
          <AlertDialogDescription>
            Modify the details below to update the contract.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEdit)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select
                onValueChange={(value) =>
                  form.setValue("employeeContractModel.departmentId", Number(value))
                }
                value={form.getValues("employeeContractModel.departmentId")?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(departments).map(([id, name]) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>
                {form.formState.errors.employeeContractModel?.departmentId?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select
                onValueChange={(value) =>
                  form.setValue("employeeContractModel.positionId", Number(value))
                }
                value={form.getValues("employeeContractModel.positionId")?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(positions).map(([id, name]) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>
                {form.formState.errors.employeeContractModel?.positionId?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeContractModel.notes")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeContractModel?.notes?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeContractModel.salary", { valueAsNumber: true })}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeContractModel?.salary?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("employeeContractModel.startDate")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeContractModel?.startDate?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("employeeContractModel.endDate")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeContractModel?.endDate?.message}
              </FormMessage>
            </FormItem>

            <AlertDialogFooter className="col-span-3">
              <AlertDialogCancel onClick={handleClose} className="mr-2">
                Cancel
              </AlertDialogCancel>
              <Button type="submit">Save</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}