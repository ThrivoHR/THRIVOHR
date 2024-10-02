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
import dayjs from "dayjs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { handleErrorApi } from "@/lib/utils";
import toast from "react-hot-toast";
import { CreateTrainingHistoryType } from "@/schemaValidation/trainingHistory.schema";
import apiTrainingHistoryRequest from "@/apiRequest/trainingHistory";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const historySchema = z.object({
  startDay: z.string().nonempty("Start date is required"),
  workshopName: z.string().nonempty("Workshop name is required"),
  content: z.string().nonempty("Content is required"),
  status: z.number().int().min(0, "Status is required"),
  employeeCode: z.string().nonempty("Employee code is required"),
});

const statusOptions = [
  { value: 0, label: "Completed" },
  { value: 1, label: "In Progress" },
  { value: 2, label: "Pending" },
  { value: 3, label: "Not Started" },

];

export function AddHistoryModal({ isOpen, onClose }: AddEmployeeModalProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateTrainingHistoryType>({
    resolver: zodResolver(historySchema),
    defaultValues: {
      startDay: "",
      workshopName: "",
      content: "",
      status: 0,
      employeeCode: "",
    },
  });

  const handleAdd = async (data: CreateTrainingHistoryType) => {
    setLoading(true);
    console.log("data", data);
    try {
      const result = await apiTrainingHistoryRequest.createTrainingHistory(data);
      toast.success("Added successfully!");
      console.log(result);
    } catch (error: any) {
      const errorMessage = error?.payload?.detail || "An error occurred";
      handleErrorApi({
        error,
        setError: form.setError,
      });
      toast.error(errorMessage);  // Display the error message in the toast
    } finally {
      setLoading(false);
      onClose();
      window.location.reload();
    }
  };
  

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[900px] max-w-6xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Career History</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to add a new item.
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
              <FormLabel>Workshop Name</FormLabel>
              <FormControl>
                <Input
                  {...form.register("workshopName")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.workshopName?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input
                  {...form.register("content")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.content?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => form.setValue("status", parseInt(value))}
                  value={form.watch("status").toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{form.formState.errors.status?.message}</FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Start Day</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("startDay")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.startDay?.message}
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
