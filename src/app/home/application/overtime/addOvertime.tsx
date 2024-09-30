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
import toast from "react-hot-toast";
import { CreateAbsentFormType } from "@/schemaValidation/absentForm.schema";
import apiAbsentFormRequest from "@/apiRequest/absentForm";
import { CreateOvertimeType } from "@/schemaValidation/overtime.schema";
import apiOvertimeRequest from "@/apiRequest/overtime";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddOvertimeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AbsentFormSchema = z.object({
  employeeId: z.string(),
  date: z.string(),
  from: z.number(),
  to: z.number(),
  reason: z.string(),
  status: z.number(),
  amount: z.number(),
});

export function AddOvertimeModal({ isOpen, onClose }: AddOvertimeModalProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateOvertimeType>({
    resolver: zodResolver(AbsentFormSchema),
    defaultValues: {
      employeeId: "",
      date: "",
      from: 0,
      to: 0,
      reason: "",
      status: 0,
      amount: 0,
    },
  });

  const handleChange = (name: string, value: string | number) => {
    form.setValue(name as keyof CreateOvertimeType, value);
  };

  const handleAdd = async (data: CreateOvertimeType) => {
    setLoading(true);
    try {
      const result = await apiOvertimeRequest.createOvertime(data);
      toast.success("Added successfully!");
      console.log(result);
      onClose();
    } catch (error: any) {
      const errorMessage = error?.payload?.detail || "An error occurred";
      handleErrorApi({
        error,
        setError: form.setError,
      });
      toast.error(errorMessage); // Display the error message in the toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[900px] max-w-6xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Add</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to add.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAdd)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeId")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeId?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                type="date"
                  {...form.register("date")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeId?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input
                  {...form.register("from", { valueAsNumber: true })}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.from?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input
                  {...form.register("to", { valueAsNumber: true })}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.to?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input
                  {...form.register("reason")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.reason?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={(value) =>
                  handleChange("status", parseInt(value))
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        form.getValues("status") === 0
                          ? "Inactive"
                          : form.getValues("status") === 1
                          ? "Active"
                          : "Pending"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Inactive</SelectItem>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="2">Pending</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage>{form.formState.errors.status?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  {...form.register("amount", { valueAsNumber: true })}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.amount?.message}</FormMessage>
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
