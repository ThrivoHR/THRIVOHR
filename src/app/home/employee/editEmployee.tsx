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
import apiEmployeeRequest from "@/apiRequest/employee";
import { UpdateEmployeeType } from "@/schemaValidation/employee.schema";
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

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeData: UpdateEmployeeType;
  employeeCode: string;
}

interface Geo {
  code: number | string;
  name: string;
}

const editEmployeeSchema = z.object({
  employeeModel: z.object({
    firstName: z.string(),
    lastName: z.string(),
    fullName: z.string(),
    identityNumber: z.string(),
    dateOfBirth: z.string(), // Assuming the date is still a string in the format YYYY-MM-DD
    phoneNumber: z.string(),
    taxCode: z.string(),
    bankAccount: z.string(),
    email: z.string(),
    address: z.object({
      addressLine: z.string(),
      ward: z.string(),
      district: z.string(),
      city: z.string(),
      country: z.string(),
    }),
    employeeCode: z.string(), // Moved inside employeeModel
  }),
});

export function EditEmployeeModal({
  isOpen,
  onClose,
  employeeData,
  employeeCode,
}: EditEmployeeModalProps) {
  const form = useForm<UpdateEmployeeType>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: employeeData,
  });
  const [provinces, setProvinces] = useState<Geo[]>([]);
  const [districts, setDistricts] = useState<Geo[]>([]);
  const [wards, setWards] = useState<Geo[]>([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>("");

  useEffect(() => {
    // Fetch provinces when component mounts
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    // Fetch districts when a province is selected
    const fetchDistricts = async () => {
      if (selectedProvinceCode) {
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`
          );
          const data = await response.json();
          setDistricts(data.districts);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      }
    };
    fetchDistricts();
  }, [selectedProvinceCode]);

  useEffect(() => {
    // Fetch wards when a district is selected
    const fetchWards = async () => {
      if (selectedDistrictCode) {
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/d/${selectedDistrictCode}?depth=2`
          );
          const data = await response.json();
          setWards(data.wards);
          console.log("Fetched wards:", data.wards);
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      }
    };
    fetchWards();
  }, [selectedDistrictCode]);

  const handleEdit = async (data: UpdateEmployeeType) => {
    try {
      const result = await apiEmployeeRequest.updateEmployee(
        employeeCode,
        data
      );
      toast.success("Employee edited successfully!");
      console.log(result);
      onClose();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
      toast.error("Error");
    }
  };

  const handleClose = () => {
    form.reset(); // Reset form state
    onClose(); // Close modal
  };

  useEffect(() => {
    if (isOpen) {
      form.reset(employeeData);
    }
  }, [isOpen, employeeData, form]);

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
            {/* Form fields */}
            <FormItem>
              <FormLabel>Employee Code</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeModel.employeeCode")}
                  className="border rounded-md px-3 py-2 w-full"
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeModel.firstName")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeModel?.firstName?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeModel.lastName")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeModel?.lastName?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeModel.email")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeModel?.email?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeModel.phoneNumber")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeModel?.phoneNumber?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register("employeeModel.dateOfBirth")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeModel?.dateOfBirth?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Identity Number</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeModel.identityNumber")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeModel?.identityNumber?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Tax Code</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeModel.taxCode")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeModel?.taxCode?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Bank Account</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeModel.bankAccount")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeModel?.bankAccount?.message}
              </FormMessage>
            </FormItem>

            {/* Address Fields */}
            <FormItem>
              <FormLabel>Address Line</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeModel.address.addressLine")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {
                  form.formState.errors.employeeModel?.address?.addressLine
                    ?.message
                }
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Province/City</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const [code, name] = value.split("|");
                    form.setValue("employeeModel.address.city", name);
                    setSelectedProvinceCode(code);
                    form.setValue("employeeModel.address.district", "");
                    form.setValue("employeeModel.address.ward", "");
                    setSelectedDistrictCode("");
                  }}
                  value={
                    form.watch("employeeModel.address.city")
                      ? `${selectedProvinceCode}|${form.watch(
                          "employeeModel.address.city"
                        )}`
                      : undefined
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem
                        key={province.code}
                        value={`${province.code}|${province.name}`}
                      >
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeModel?.address?.city?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const [code, name] = value.split("|");
                    form.setValue("employeeModel.address.district", name);
                    setSelectedDistrictCode(code);
                    form.setValue("employeeModel.address.ward", "");
                  }}
                  value={
                    districts.find(
                      (district) =>
                        district.name ===
                        form.watch("employeeModel.address.district")
                    )
                      ? `${selectedDistrictCode}|${form.watch(
                          "employeeModel.address.district"
                        )}`
                      : ""
                  }
                  disabled={!selectedProvinceCode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem
                        key={district.code}
                        value={`${district.code}|${district.name}`}
                      >
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {
                  form.formState.errors.employeeModel?.address?.district
                    ?.message
                }
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Ward</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const [code, name] = value.split("|");
                    form.setValue("employeeModel.address.ward", name);
                  }}
                  value={
                    wards.find(
                      (ward) =>
                        ward.name === form.watch("employeeModel.address.ward")
                    )
                      ? `${
                          wards.find(
                            (ward) =>
                              ward.name ===
                              form.watch("employeeModel.address.ward")
                          )?.code
                        }|${form.watch("employeeModel.address.ward")}`
                      : ""
                  }
                  disabled={!selectedDistrictCode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ward" />
                  </SelectTrigger>
                  <SelectContent>
                    {wards.map((ward) => (
                      <SelectItem
                        key={ward.code}
                        value={`${ward.code}|${ward.name}`}
                      >
                        {ward.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeModel?.address?.ward?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input
                  {...form.register("employeeModel.address.country")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.employeeModel?.address?.country?.message}
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
