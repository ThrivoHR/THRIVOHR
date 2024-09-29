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
import { UpdateProjectType } from "@/schemaValidation/project.schema";
import apiProjectRequest from "@/apiRequest/project";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: UpdateProjectType;
  id: string;
}

const UpdateProjectSchema = z.object({
  projectModel: z.object({
    name: z.string(),
    description: z.string(),
    leaderCode: z.string(),
    subLeaderCode: z.string(),
  }),
  id: z.string(),
})

export function EditProjectModal({
  isOpen,
  onClose,
  data,
  id,
}: EditProjectModalProps) {
  const form = useForm<UpdateProjectType>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: data,
  });

  const handleEdit = async (data: UpdateProjectType) => {
    try {
      const result = await apiProjectRequest.updateProject(data);
      toast.success("Employee edited successfully!");
      console.log(result);
      onClose();
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
      form.reset(data);
    }
  }, [isOpen, data, form]);

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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...form.register("projectModel.name")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.projectModel?.name?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...form.register("projectModel.description")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.projectModel?.description?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Leader Code</FormLabel>
              <FormControl>
                <Input
                  {...form.register("projectModel.leaderCode")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.projectModel?.leaderCode?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Sub-leaeder Code</FormLabel>
              <FormControl>
                <Input
                  {...form.register("projectModel.subLeaderCode")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.projectModel?.subLeaderCode?.message}
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
