import React, { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"


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
        <DialogFooter>
        <DialogClose asChild>
          <Button>kkk</Button>
        </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
