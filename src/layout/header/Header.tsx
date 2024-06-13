import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import logo from "/public/thrivoHR-icon.png";

export default function Header() {
  return (
    <header className="flex h-[55px] max-w-full shrink-0 items-center px-4 md:px-6 border-b bg-slate-100/60">
      <div className="ml-auto flex items-center gap-4">
        <Avatar>
          <Image src={logo} alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
