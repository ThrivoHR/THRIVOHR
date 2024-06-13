import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/thrivoHR-icon.png";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <h1 className="text-xl font-bold">ThrivoHR</h1>
        </div>
      </header>
      <div className="grid flex-1 items-center justify-center">
        <div className="grid grid-cols-12 gap-20 w-full">
          <div className="col-span-5 flex items-center justify-center">
            <Image src="https://i.pinimg.com/564x/d1/64/26/d16426da270979ed4715325f6c972f42.jpg" alt="Left Image" width={400} height={400} />
          </div>
          <div className="col-span-7 w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
            <div className="space-y-4 text-left">
              <h2 className="text-3xl font-bold">ThrivoHR</h2>
              <p className="text-gray-500">
                Where HR Thrives !
              </p>
            </div>
            <form className="space-y-6">
              <div>
                <div className="my-2">
                  <Label htmlFor="email">Email</Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="datsadboy@example.com"
                  required
                />
              </div>
              <div>
                <div className="flex items-center justify-between my-2">
                  <Label htmlFor="password">Password</Label>
                 
                </div>
                <Input id="password" type="password" required />
              </div>
              <Separator className="my-6" />
              <div>
                <Link href="/home/employee">
                  <Button
                    type="submit"
                    className="w-full bg-blue-400 hover:bg-blue-300"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
