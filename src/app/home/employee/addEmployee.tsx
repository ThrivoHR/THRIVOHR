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
import { CreateEmployeeType } from "@/schemaValidation/employee.schema";
import dayjs from "dayjs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleErrorApi } from "@/lib/utils";
import toast from "react-hot-toast";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Geo {
  code: number | string;
  name: string;
}

const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  fullName: z.string().min(1, "Full name is required"),
  identityNumber: z.string().min(1, "Identity number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  taxCode: z.string().min(1, "Tax code is required"),
  bankAccount: z.string().min(1, "Bank account is required"),
  email: z.string().email("Invalid email address"),
  sex: z.boolean(),
  religion: z.string().min(1, "Religion is required"),
  ethnicity: z.string().min(1, "Ethnicity is required"),
  address: z.object({
    addressLine: z.string().min(1, "Address line is required"),
    ward: z.string().min(1, "Ward is required"),
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
  }),
});

export function AddEmployeeModal({ isOpen, onClose }: AddEmployeeModalProps) {
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<Geo[]>([]);
  const [districts, setDistricts] = useState<Geo[]>([]);
  const [wards, setWards] = useState<Geo[]>([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>("");

  const form = useForm<CreateEmployeeType>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      fullName: "",
      identityNumber: "",
      dateOfBirth: "",
      phoneNumber: "",
      taxCode: "",
      bankAccount: "",
      email: "",
      address: {
        addressLine: "",
        ward: "",
        district: "",
        city: "",
        country: "Việt Nam",
      },
    },
  });

  const handleAdd = async (data: CreateEmployeeType) => {
    setLoading(true);
    const formattedData = {
      ...data,
      dateOfBirth: dayjs(data.dateOfBirth).format("YYYY-MM-DD"),
    };
    console.log("data", formattedData);
    try {
      const result = await apiEmployeeRequest.createEmployee(formattedData);
      toast.success("Employee added successfully!");
      form.reset();
      console.log(result);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || "Employee add failed";
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

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[900px] max-w-6xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Employee</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to add a new employee.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAdd)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  {...form.register("firstName")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.firstName?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  {...form.register("lastName")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.lastName?.message}
              </FormMessage>
            </FormItem>
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
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) =>
                    form.setValue("sex", value === "true")
                  }
                  value={form.watch("sex") !== undefined ? (form.watch("sex") ? "true" : "false") : undefined} 
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Male</SelectItem>
                    <SelectItem value="false">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{form.formState.errors.sex?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Religion</FormLabel>
              <FormControl>
                <Input
                  {...form.register("religion")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.religion?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Ethnicity</FormLabel>
              <FormControl>
                <Input
                  {...form.register("ethnicity")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.ethnicity?.message}
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
              <FormLabel>Identity Number</FormLabel>
              <FormControl>
                <Input
                  {...form.register("identityNumber")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.identityNumber?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Tax Code</FormLabel>
              <FormControl>
                <Input
                  {...form.register("taxCode")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.taxCode?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Bank Account</FormLabel>
              <FormControl>
                <Input
                  {...form.register("bankAccount")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.bankAccount?.message}
              </FormMessage>
            </FormItem>
            {/* Address fields */}
            <FormItem>
              <FormLabel>Address Line</FormLabel>
              <FormControl>
                <Input
                  {...form.register("address.addressLine")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.address?.addressLine?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Province/City</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const [code, name] = value.split("|");
                    form.setValue("address.city", name);
                    setSelectedProvinceCode(code);
                    form.setValue("address.district", "");
                    form.setValue("address.ward", "");
                    setSelectedDistrictCode("");
                  }}
                  value={
                    form.watch("address.city")
                      ? `${selectedProvinceCode}|${form.watch("address.city")}`
                      : undefined
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    <SelectGroup>{provinces.map((province) => (
                      <SelectItem
                        key={province.code}
                        value={`${province.code}|${province.name}`}
                      >
                        {province.name}
                      </SelectItem>
                    ))}</SelectGroup>
                    
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.address?.city?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const [code, name] = value.split("|");
                    form.setValue("address.district", name);
                    setSelectedDistrictCode(code);
                    // Reset ward when district changes
                    form.setValue("address.ward", "");
                  }}
                  value={
                    districts.find(
                      (district) =>
                        district.name === form.watch("address.district")
                    )
                      ? `${selectedDistrictCode}|${form.watch(
                          "address.district"
                        )}`
                      : ""
                  }
                  disabled={!selectedProvinceCode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
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
                {form.formState.errors.address?.district?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Ward</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const [code, name] = value.split("|");
                    form.setValue("address.ward", name);
                  }}
                  value={
                    wards.find(
                      (ward) => ward.name === form.watch("address.ward")
                    )
                      ? `${
                          wards.find(
                            (ward) => ward.name === form.watch("address.ward")
                          )?.code
                        }|${form.watch("address.ward")}`
                      : ""
                  }
                  disabled={!selectedDistrictCode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ward" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
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
                {form.formState.errors.address?.ward?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input
                  {...form.register("address.country")}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.address?.country?.message}
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
