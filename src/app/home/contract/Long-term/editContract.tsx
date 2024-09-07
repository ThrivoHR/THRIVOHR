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
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UpdateContractType } from "@/schemaValidation/contract.schema";
import apiContractRequest from "@/apiRequest/contract";
import toast from "react-hot-toast";

interface EditContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractData: UpdateContractType;
  contractId: string;
}

const editContractSchema = z.object({
  employeeContractModel: z.object({
    departmentId:z.number(),
    positionId:z.number(),
    startDate:z.string(),
    endDate:z.string(),
    notes:z.string(),
    salary:z.number(),
    contractId:z.string()
  }),
});

export function EditContractModal({
  isOpen,
  onClose,
  contractData,
  contractId,
}: EditContractModalProps) {
  const form = useForm<UpdateContractType>({
    resolver: zodResolver(editContractSchema),
    defaultValues: contractData,
  });

  const handleEdit = async (data: UpdateContractType) => {
    console.log("Submitting form with data:", data);
    try {
      const updatedData = {
        ...data,
        employeeContractModel: {
          ...data.employeeContractModel,
          departmentId: data.employeeContractModel.departmentId,
          positionId: data.employeeContractModel.positionId,
        },
      };
      const result = await apiContractRequest.updateContract(contractId, updatedData);
      toast.success("Contract edited successfully!");
      console.log(result);
      onClose();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
      toast.error("Error");
    }
  };
  
  
  const handleClose = () => {
    form.reset(); // Reset form state
    onClose();    // Close modal
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
            {/* Form fields */}
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeContractModel.departmentId", { valueAsNumber: true })}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeContractModel?.departmentId?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeContractModel.positionId", { valueAsNumber: true })}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
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
                {/* {form.formState.errors.employeeModel.lastName?.message} */}
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
