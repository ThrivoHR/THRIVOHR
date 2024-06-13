import React, { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CustomDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

export function CustomDialog({ trigger, title, description, children }: CustomDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogClose asChild>
          <button className="absolute top-4 right-4">
            {/* You can add an icon or text for the close button here */}
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
