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

interface AddRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const rewardSchema = z.object({
  employeeId: z.string().nonempty(),
  date: z.string().nonempty(),
  formOfAction: z.number(),
  amount: z.number(),
  reason: z.string().nonempty(),
  isRewards: z.boolean(),
  status: z.number(),
});

export function AddRewardModal({ isOpen, onClose }: AddRewardModalProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateRewardAndDisciplinaryType>({
    resolver: zodResolver(rewardSchema),
    defaultValues: {
      employeeId: "",
      date: "",
      formOfAction: 0,
      amount: 0,
      reason: "",
      isRewards: false,
      status: 0,
    },
  });

  const handleAdd = async (data: CreateRewardAndDisciplinaryType) => {
    setLoading(true);
    try {
      const result = await apiRewardAndDisciplinaryRequest.CreateRewardAndDisciplinary(data);
      toast.success("Reward/Disciplinary action added successfully!");
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
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeId")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.employeeId?.message}</FormMessage>
            </FormItem>

            {/* Date */}
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("date")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.date?.message}</FormMessage>
            </FormItem>

            {/* Form of Action */}
            <FormItem>
              <FormLabel>Form of Action</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => form.setValue("formOfAction", parseInt(value))}
                  defaultValue="0"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select form of action" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(8)].map((_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{form.formState.errors.formOfAction?.message}</FormMessage>
            </FormItem>

            {/* Amount */}
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...form.register("amount", { valueAsNumber: true })}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.amount?.message}</FormMessage>
            </FormItem>

            {/* Reason */}
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

            {/* Is Reward */}
            <FormItem>
              <FormLabel>Is Reward?</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) =>
                    form.setValue("isRewards", value === "true")
                  }
                  defaultValue="false"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reward or disciplinary" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Reward</SelectItem>
                    <SelectItem value="false">Disciplinary</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{form.formState.errors.isRewards?.message}</FormMessage>
            </FormItem>

            {/* Status */}
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => form.setValue("status", parseInt(value))}
                  defaultValue="0"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Pending</SelectItem>
                    <SelectItem value="1">Approved</SelectItem>
                    <SelectItem value="2">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{form.formState.errors.status?.message}</FormMessage>
            </FormItem>

            {/* Form Submission */}
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
