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
import { date, z } from "zod";
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
import toast from "react-hot-toast";
import { CreateResignFormType } from "@/schemaValidation/resignForm.schema";
import apiResignFormRequest from "@/apiRequest/resignForm";

interface AddResignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResignFormSchema = z.object({
  employeeCode: z.string().nonempty("Employee code is required"),
  dateTime: z.string().nonempty("Date is required"),
  reason: z.string().nonempty("Reason is required"),
  lastWorkingDate: z.string().nonempty("Last working date is required"),
});

export function AddResignFormModal({ isOpen, onClose }: AddResignModalProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateResignFormType>({
    resolver: zodResolver(ResignFormSchema),
    defaultValues: {
      employeeCode: "",
      dateTime: "",
      reason: "",
      lastWorkingDate: "",
    },
  });

  const handleAdd = async (data: CreateResignFormType) => {
    setLoading(true);
    try {
      const result = await apiResignFormRequest.createApplicationForm(data);
      toast.success("Added successfully!");
      console.log(result);
      onClose();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
      toast.error("Added failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[900px] max-w-6xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Add new resignation</AlertDialogTitle>
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
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("dateTime")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.dateTime?.message}
              </FormMessage>
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
              <FormLabel>Last working date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("lastWorkingDate")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.lastWorkingDate?.message}
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
