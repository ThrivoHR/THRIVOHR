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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleErrorApi } from "@/lib/utils";
import { CreateContractType } from "@/schemaValidation/contract.schema";
import apiContractRequest from "@/apiRequest/contract";
import apiPositionRequest from "@/apiRequest/position";
import apiDepartmentRequest from "@/apiRequest/department";
import toast from "react-hot-toast";
import { CreateApplicationFormType } from "@/schemaValidation/applicationForm.schema";
import apiApplicationFormRequest from "@/apiRequest/applicationForm";

interface AddApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationFormSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  dateOfBirth: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  nationalID: z.string(),
  gender: z.boolean(),
  educationLevel: z.string(),
  employmentHistory: z.string(),
  status: z.number(),
  positionId: z.number(),
  departmentId: z.number(),
});

export function AddApplicationFormModal({
  isOpen,
  onClose,
}: AddApplicationModalProps) {
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState<{ [key: number]: string }>({});
  const [departments, setDepartments] = useState<{ [key: number]: string }>({});

  const form = useForm<CreateApplicationFormType>({
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: "",
      city: "",
      country: "",
      nationalID: "",
      educationLevel: "",
      employmentHistory: "",
      status: 0,
      positionId: 0,
      departmentId: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [positionsData, departmentsData] = await Promise.all([
          apiPositionRequest.getPosition(),
          apiDepartmentRequest.getDepartment(),
        ]);
        setPositions(positionsData.payload.value);
        setDepartments(departmentsData.payload.value);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (data: CreateApplicationFormType) => {
    setLoading(true);
    try {
      const result = await apiApplicationFormRequest.createApplicationForm(data);
      toast.success("Application added successfully!");
      console.log(result);
      onClose();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
      toast.error("Application addition failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: string | number) => {
    form.setValue(name as keyof CreateApplicationFormType, value);
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
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  {...form.register("fullName")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.fullName?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...form.register("email")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  {...form.register("phoneNumber")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.phoneNumber?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select
                onValueChange={(value) =>
                  handleChange("departmentId", parseInt(value))
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        form.getValues("departmentId") === 0
                          ? "Select Department"
                          : departments[
                              form.getValues(
                                "departmentId"
                              ) as keyof typeof departments
                            ]
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(departments).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>
                {form.formState.errors.departmentId?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select
                onValueChange={(value) =>
                  handleChange("positionId", parseInt(value))
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        form.getValues("positionId") === 0
                          ? "Select Position"
                          : positions[
                              form.getValues(
                                "positionId"
                              ) as keyof typeof positions
                            ]
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(positions).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>
                {form.formState.errors.positionId?.message}
              </FormMessage>
            </FormItem>

            {/* <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("startDate")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.startDate?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("endDate")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.endDate?.message}</FormMessage>
            </FormItem>

            

            <FormItem>
              <FormLabel>Employee</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeCode")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.employeeCode?.message}</FormMessage>
            </FormItem> */}

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
