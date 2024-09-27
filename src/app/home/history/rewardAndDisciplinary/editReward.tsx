"use client";

import { useEffect } from "react";
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
import { UpdateRewardAndDisciplinaryType } from "@/schemaValidation/rewardAndDisciplinary.schema";
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
import { apiRewardAndDisciplinaryRequest } from "@/apiRequest/rewardAndDisciplinary";

interface EditRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardData: UpdateRewardAndDisciplinaryType;
  id: string;
}

const editRewardSchema = z.object({
  rewardAndDisciplinaryModel: z.object({
    employeeId: z.string().nonempty(),
    date: z.string().nonempty(),
    formOfAction: z.number(),
    amount: z.number(),
    reason: z.string().nonempty(),
    isRewards: z.boolean(),
    status: z.number(),
  }),
  id: z.string(),
});

export function EditRewardModal({
  isOpen,
  onClose,
  rewardData,
  id,
}: EditRewardModalProps) {
  const form = useForm<UpdateRewardAndDisciplinaryType>({
    resolver: zodResolver(editRewardSchema),
  });

  const handleEdit = async (data: UpdateRewardAndDisciplinaryType) => {
    try {
      const result =
        await apiRewardAndDisciplinaryRequest.UpdateRewardAndDisciplinary(data);
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
      form.reset(rewardData);
    }
  }, [isOpen, rewardData, form]);

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="w-[900px] max-w-6xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Employee</AlertDialogTitle>
          <AlertDialogDescription>
            Modify the details below to update the employee.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEdit)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input
                  {...form.register("rewardAndDisciplinaryModel.employeeId")}
                  readOnly
                />
              </FormControl>
              <FormMessage>
                {
                  form.formState.errors.rewardAndDisciplinaryModel?.employeeId
                    ?.message
                }
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("rewardAndDisciplinaryModel.date")}
                />
              </FormControl>
              <FormMessage>
                {
                  form.formState.errors.rewardAndDisciplinaryModel?.date
                    ?.message
                }
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Form of Action</FormLabel>
              <FormControl>
                <Select
                  {...form.register("rewardAndDisciplinaryModel.formOfAction")}
                  onValueChange={(value) =>
                    form.setValue(
                      "rewardAndDisciplinaryModel.formOfAction",
                      Number(value)
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Form of Action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Action 0</SelectItem>
                    <SelectItem value="1">Action 1</SelectItem>
                    <SelectItem value="2">Action 2</SelectItem>
                    <SelectItem value="3">Action 3</SelectItem>
                    <SelectItem value="4">Action 4</SelectItem>
                    <SelectItem value="5">Action 5</SelectItem>
                    <SelectItem value="6">Action 6</SelectItem>
                    <SelectItem value="7">Action 7</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {
                  form.formState.errors.rewardAndDisciplinaryModel?.formOfAction
                    ?.message
                }
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...form.register("rewardAndDisciplinaryModel.amount", {
                    valueAsNumber: true, // Automatically convert to number
                  })}
                  onChange={(e) => {
                    const value = e.target.value;
                    form.setValue(
                      "rewardAndDisciplinaryModel.amount",
                      value ? Number(value) : 0
                    ); // Convert to number, default to 0 if empty
                  }}
                />
              </FormControl>
              <FormMessage>
                {
                  form.formState.errors.rewardAndDisciplinaryModel?.amount
                    ?.message
                }
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input
                  {...form.register("rewardAndDisciplinaryModel.reason")}
                />
              </FormControl>
              <FormMessage>
                {
                  form.formState.errors.rewardAndDisciplinaryModel?.reason
                    ?.message
                }
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Is Reward?</FormLabel>
              <FormControl>
                <Select
                  {...form.register("rewardAndDisciplinaryModel.isRewards")}
                  onValueChange={(value) =>
                    form.setValue(
                      "rewardAndDisciplinaryModel.isRewards",
                      value === "true"
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Reward Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Rewards</SelectItem>
                    <SelectItem value="false">Disciplinary</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {
                  form.formState.errors.rewardAndDisciplinaryModel?.isRewards
                    ?.message
                }
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  {...form.register("rewardAndDisciplinaryModel.status")}
                  onValueChange={(value) =>
                    form.setValue(
                      "rewardAndDisciplinaryModel.status",
                      Number(value)
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Pending</SelectItem>
                    <SelectItem value="1">Approved</SelectItem>
                    <SelectItem value="2">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {
                  form.formState.errors.rewardAndDisciplinaryModel?.status
                    ?.message
                }
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
