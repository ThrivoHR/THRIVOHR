import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import profilePic from "/public/thrivoHR-icon.png"; // Placeholder image

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-6xl mx-auto flex justify-center">
      <Card className="w-full max-w-4xl p-4 space-y-4">
        <div className="flex flex-col items-center">
          <Image
            src={profilePic}
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full"
          />
          <h1 className="text-xl font-bold mt-2">John Doe</h1>
          <p className="text-gray-600 text-sm">HR Manager</p>
        </div>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="fullName" className="w-1/3">Full Name</Label>
              <Input id="fullName" value="John Doe" readOnly className="flex-1" />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="email" className="w-1/3">Email Address</Label>
              <Input id="email" type="email" value="john.doe@example.com" readOnly className="flex-1" />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="phone" className="w-1/3">Phone Number</Label>
              <Input id="phone" value="+1 (555) 123-4567" readOnly className="flex-1" />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="department" className="w-1/3">Department</Label>
              <Input id="department" value="Human Resources" readOnly className="flex-1" />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="department" className="w-1/3">Position</Label>
              <Input id="department" value="Head Master" readOnly className="flex-1" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="button" className="w-full bg-blue-500 hover:bg-blue-600">
            Edit Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
