"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import logo from "/public/thrivoHR-icon.png";
import authApiRequest from "@/apiRequest/auth";

export default function Header() {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/home/profile");
  };

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer(true).then(() => {
        router.push(`/login`);
      });
    } finally {
      router.refresh();
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("sessionTokenExpiresAt");
    }
  };

  return (
    <header className="flex h-[55px] max-w-full shrink-0 items-center px-4 md:px-6 border-b bg-white">
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <Image src={logo} alt="avatar" className="mr-6" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-3">
            <DropdownMenuItem asChild>
              <Button onClick={handleProfileClick} variant="ghost" className="w-full">
                Profile
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button onClick={handleLogout} variant="ghost" className="w-full">
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
