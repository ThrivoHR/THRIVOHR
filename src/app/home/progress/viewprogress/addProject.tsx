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

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  leaderCode: z.string().nonempty(),
  subLeaderCode: z.string().nonempty(),
});

export function AddProjectModal({ isOpen, onClose}: AddProjectModalProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateProjectType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      leaderCode: "",
      subLeaderCode: "",
    },
  });

  const handleAdd = async (data: CreateProjectType) => {
    setLoading(true);
    try {
      await apiProjectRequest.createProject(data);
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
          <AlertDialogTitle>Add Reward/Disciplinary</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to add a reward or disciplinary action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAdd)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Employee ID */}
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

            {/* Date */}
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

            {/* Amount */}
            <FormItem>
              <FormLabel>Leader Code</FormLabel>
              <FormControl>
                <Input
                  {...form.register("leaderCode")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.leaderCode?.message}
              </FormMessage>
            </FormItem>

            {/* Reason */}
            <FormItem>
              <FormLabel>Sub Leader Code</FormLabel>
              <FormControl>
                <Input
                  {...form.register("subLeaderCode")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.subLeaderCode?.message}
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
