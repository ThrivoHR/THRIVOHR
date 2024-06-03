import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/thrivoHR-icon.png";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-12 min-h-screen items-center justify-center">
      <div className="col-span-7 flex items-center justify-center">
        <Image src={logo} alt="Logo" width={300} height={300} />
      </div>
      <div className="col-span-5 w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div className="space-y-8 text-center">
          <h1 className="text-3xl font-bold">ThrivoHR</h1>
          <p className="text-gray-500">
            Enter your email and password to sign in.
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
              <Link
                href="#"
                className="text-sm font-medium text-gray-900 hover:underline"
                prefetch={false}
              >
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" required/>
          </div>
          <Separator className="my-6" />
          <Button type="submit" className="w-full bg-blue-400 hover:bg-blue-300">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
