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
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { CreateRewardAndDisciplinaryType } from "@/schemaValidation/rewardAndDisciplinary.schema";
import { apiRewardAndDisciplinaryRequest } from "@/apiRequest/rewardAndDisciplinary";
import { handleErrorApi } from "@/lib/utils";
import { CreateProjectType } from "@/schemaValidation/project.schema";
import apiProjectRequest from "@/apiRequest/project";
import { CreateProjectTaskType } from "@/schemaValidation/projectTask.schema";
import apiProjectTaskRequest from "@/apiRequest/projectTask";

interface AddProjectTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectTaskSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    projectId: z.string().nonempty(),
    assigneeCode: z.string().nonempty(),
    dueDate: z.string().nonempty(),
});

export function AddProjectTaskModal({ isOpen, onClose}: AddProjectTaskModalProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateProjectTaskType>({
    resolver: zodResolver(projectTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      projectId: "",
      assigneeCode: "",
      dueDate: "",
    },
  });

  const handleAdd = async (data: CreateProjectTaskType) => {
    setLoading(true);
    try {
      await apiProjectTaskRequest.createProjectTask(data);
      toast.success("Added successfully!");
      form.reset();
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
          <AlertDialogTitle>Add new project</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to add a new project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAdd)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...form.register("name")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...form.register("description")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Project ID</FormLabel>
              <FormControl>
                <Input
                  {...form.register("projectId")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.projectId?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Assignee Code</FormLabel>
              <FormControl>
                <Input
                  {...form.register("assigneeCode")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.assigneeCode?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("dueDate")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.dueDate?.message}
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
