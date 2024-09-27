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

interface AddAbsentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AbsentFormSchema = z.object({
  employeeCode: z.string(),
  from: z.string(),
  to: z.string(),
  reason: z.string(),
});

export function AddAbsentFormModal({ isOpen, onClose }: AddAbsentModalProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateAbsentFormType>({
    resolver: zodResolver(AbsentFormSchema),
    defaultValues: {
      employeeCode: "",
      from: "",
      to: "",
      reason: "",
    },
  });

  const handleAdd = async (data: CreateAbsentFormType) => {
    setLoading(true);
    try {
      const result = await apiAbsentFormRequest.createAbsentForm(data);
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
              <FormLabel>Employee Code</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeCode")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeCode?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...form.register("from")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.from?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...form.register("to")}
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
