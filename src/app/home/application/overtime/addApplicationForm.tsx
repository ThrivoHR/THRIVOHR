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
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone Number must be at least 10 digits"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  nationalID: z.string().min(1, "National ID is required"),
  gender: z.boolean(),
  educationLevel: z.string().min(1, "Education Level is required"),
  employmentHistory: z.string().min(1, "Employment History is required"),
  status: z.number().min(0).max(2, "Status must be between 0 and 2"),
  positionId: z.number().min(1, "Position is required"),
  departmentId: z.number().min(1, "Department is required"),
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
      gender: true,
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
      const result = await apiApplicationFormRequest.createApplicationForm(
        data
      );
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

  const handleChange = (name: string, value: string | number | boolean) => {
    form.setValue(name as keyof CreateApplicationFormType, value);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[900px] max-w-6xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Add new application</AlertDialogTitle>
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
              <FormMessage>
                {form.formState.errors.fullName?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("dateOfBirth")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.dateOfBirth?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  {...form.register("address")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.address?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  {...form.register("city")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.city?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input
                  {...form.register("country")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.country?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>National ID</FormLabel>
              <FormControl>
                <Input
                  {...form.register("nationalID")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.nationalID?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Education level</FormLabel>
              <FormControl>
                <Input
                  {...form.register("educationLevel")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.nationalID?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Employment history</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employmentHistory")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.nationalID?.message}
              </FormMessage>
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
              <FormMessage>
                {form.formState.errors.phoneNumber?.message}
              </FormMessage>
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

            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select
                onValueChange={(value) =>
                  handleChange("gender", value === "true" ? true : false)
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        form.getValues("gender") === true ? "Male" : "Female"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Male</SelectItem>
                  <SelectItem value="false">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage>{form.formState.errors.gender?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={(value) =>
                  handleChange("status", parseInt(value))
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        form.getValues("status") === 0
                          ? "Inactive"
                          : form.getValues("status") === 1
                          ? "Active"
                          : "Pending"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Inactive</SelectItem>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="2">Pending</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage>{form.formState.errors.status?.message}</FormMessage>
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
