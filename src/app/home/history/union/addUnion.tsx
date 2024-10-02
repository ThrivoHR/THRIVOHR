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
import { CreateUnionType } from "@/schemaValidation/union.schema";
import apiUnionRequest from "@/apiRequest/union";

interface AddUnionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const unionSchema = z.object({
  employeeCode: z.string().nonempty("Employee code is required"),
  title: z.string().nonempty("Title is required"),
  dateJoined: z.string().nonempty("Date joined is required"),
});

export function AddUnionModal({ isOpen, onClose }: AddUnionModalProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateUnionType>({
    resolver: zodResolver(unionSchema),
    defaultValues: {
      employeeCode: "",
      title: "",
      dateJoined: "",
    },
  });

  const handleAdd = async (data: CreateUnionType) => {
    setLoading(true);
    console.log("data", data);
    try {
      const result = await apiUnionRequest.createUnion(data);
      toast.success("Added successfully!");
      console.log(result);
      window.location.reload();
    } catch (error: any) {
      const errorMessage = error?.payload?.detail || "An error occurred";
      handleErrorApi({
        error,
        setError: form.setError,
      });
      toast.error(errorMessage); 
    } finally {
      setLoading(false);
      onClose();
    }
  };
  

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[900px] max-w-6xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Union History</AlertDialogTitle>
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
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...form.register("title")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.title?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Date Joined</FormLabel>
              <FormControl>
                <Input
                  {...form.register("dateJoined")}
                  type="date"
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.dateJoined?.message}
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
