import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400">
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
              placeholder="m@example.com"
              required
            />
          </div>
          <div>
            <div className="flex items-center justify-between my-2">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-400"
                prefetch={false}
              >
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Separator className="my-6" />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="font-medium text-gray-900 hover:underline dark:text-gray-400"
            prefetch={false}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
