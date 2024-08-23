"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import logo from "/public/thrivoHR-icon.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import authApiRequest from "@/apiRequest/auth";
import { handleErrorApi } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const forbiddenChars = /^[^a-zA-Z]*$/;

  const formSchema = z.object({
    employeeCode: z.string()
      .length(6, "Employee Code must be 6 characters")
      .refine(value => forbiddenChars.test(value), {
        message: "Employee Code must not contain special characters",
      }),
    password: z.string().nonempty("Password is required"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeCode: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const result = await authApiRequest.login(values);
      if (result.payload.value.token) {
        await authApiRequest.auth({
          sessionToken: result.payload.value.token,
        });
        localStorage.setItem("sessionToken", result.payload.value.token)
        router.push("/home");
        console.log(result)
      }

    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-md py-3">
        <div className="container flex items-center justify-between">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <h1 className="text-xl font-bold">ThrivoHR</h1>
        </div>
      </header>
      <div className="flex flex-1 lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center lg:min-h-full">
          <div className="flex justify-center items-center ">
            <Image
              src="https://i.pinimg.com/564x/d1/64/26/d16426da270979ed4715325f6c972f42.jpg"
              alt="Left Image"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="flex items-center justify-center space-y-3 h-full w-f">
          <Card className="w-full max-w-[420px] mx-auto">
            <CardHeader className="flex items-center justify-center">
              <h1 className="text-3xl font-bold">ThrivoHR</h1>
              <p className="text-lg">Where HR Thrives !</p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="employeeCode"
                    render={({ field }) => (
                      <FormItem>
                        <label>Employee ID</label>
                        <FormControl>
                          <Input {...field} placeholder="000000" />

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <label>Password</label>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator className="my-4" />
                  <Button type="submit" className="w-full bg-blue-500/80 hover:bg-blue-500/70" disabled={loading}>
                    {loading ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
