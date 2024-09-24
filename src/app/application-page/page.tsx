"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "/public/thrivoHR-icon.png";
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
import apiPositionRequest from "@/apiRequest/position";
import apiDepartmentRequest from "@/apiRequest/department";
import toast from "react-hot-toast";
import { CreateApplicationFormType } from "@/schemaValidation/applicationForm.schema";
import apiApplicationFormRequest from "@/apiRequest/applicationForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

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

export default function ApplicationFormPage() {
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
      // Optionally reset the form or redirect
    } catch (error: any) {
      const errorMessage = error?.payload?.detail || "An error occurred";
      handleErrorApi({
        error,
        setError: form.setError,
      });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: string | number | boolean) => {
    form.setValue(name as keyof CreateApplicationFormType, value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md py-3 fixed top-0 left-0 right-0 z-10">
        <div className="container flex items-center justify-between">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <h1 className="text-xl font-bold">ThrivoHR</h1>
        </div>
      </header>
      <div className="flex-grow mt-16 flex items-center justify-between gap-10">
        <div className="ml-10">
          <Image
            src="https://img.freepik.com/free-vector/woman-standing-mammography-machine-examination-disease-diagnosis_74855-11248.jpg"
            width={600}
            height={600}
            alt="Image"
          />
        </div>
        <div className="max-w-4xl mx-auto p-4">
          <Form {...form}>
            <Card>
              <CardHeader>
                <CardTitle>Application Form</CardTitle>
                <CardDescription>
                  Fill in this form and we will contact you
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                              form.getValues("gender") === true
                                ? "Male"
                                : "Female"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Male</SelectItem>
                        <SelectItem value="false">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage>
                      {form.formState.errors.gender?.message}
                    </FormMessage>
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
                    <FormMessage>
                      {form.formState.errors.status?.message}
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
                    <FormMessage>
                      {form.formState.errors.city?.message}
                    </FormMessage>
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
                    <FormLabel>Education Level</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("educationLevel")}
                        className="border rounded-md px-3 py-2 w-full"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.educationLevel?.message}
                    </FormMessage>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Employment History</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("employmentHistory")}
                        className="border rounded-md px-3 py-2 w-full"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.employmentHistory?.message}
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
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
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

                  {/* Select Components for Position and Department */}
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          handleChange("positionId", Number(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a position" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(positions).map(([id, name]) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.positionId?.message}
                    </FormMessage>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          handleChange("departmentId", Number(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(departments).map(([id, name]) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.departmentId?.message}
                    </FormMessage>
                  </FormItem>

                  <div className="col-span-3 flex justify-end mt-4">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Form>
        </div>
      </div>
    </div>
  );
}
