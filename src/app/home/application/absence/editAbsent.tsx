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
import { UpdateEmployeeType } from "@/schemaValidation/employee.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { handleErrorApi } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import apiAbsentFormRequest from "@/apiRequest/absentForm";
import { UpdateAbsentFormType } from "@/schemaValidation/absentForm.schema";

interface EditAbsentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  absentData: UpdateAbsentFormType;
  id: string;
}

const UpdateAbsentFormSchema = z.object({
  absentFormModel: z.object({
      employeeCode: z.string(),
      from: z.string(),
      to: z.string(),
      reason: z.string(),
  }),
  id: z.string(),
})

export function EditAbsentModal({
  isOpen,
  onClose,
  absentData,
  id,
}: EditAbsentFormModalProps) {
  const form = useForm<UpdateAbsentFormType>({
    resolver: zodResolver(UpdateAbsentFormSchema),
    defaultValues: absentData,
  });

  const handleEdit = async (data: UpdateAbsentFormType) => {
    try {
      const result = await apiAbsentFormRequest.updateAbsentForm(id, data);
      toast.success("Employee edited successfully!");
      console.log(result);
      onClose();
      window.location.reload();
    } catch (error: any) {
      const errorMessage = error?.payload?.detail || "An error occurred";
      handleErrorApi({
        error,
        setError: form.setError,
      });
      toast.error(errorMessage); 
    }
  };
  

  const handleClose = () => {
    form.reset(); // Reset form state
    onClose(); // Close modal
  };

  useEffect(() => {
    if (isOpen) {
      form.reset(absentData);
    }
  }, [isOpen, absentData, form]);

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="w-[900px] max-w-6xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit</AlertDialogTitle>
          <AlertDialogDescription>
            Modify the details below to update.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEdit)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <FormItem>
              <FormLabel>Employee Code</FormLabel>
              <FormControl>
                <Input
                  {...form.register("absentFormModel.employeeCode")}
                  className="border rounded-md px-3 py-2 w-full"
                  readOnly
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.absentFormModel?.employeeCode?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input
                type="date"
                  {...form.register("absentFormModel.from")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.absentFormModel?.from?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input
                type="date"
                  {...form.register("absentFormModel.to")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.absentFormModel?.to?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input
                  {...form.register("absentFormModel.reason")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.absentFormModel?.reason?.message}
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
