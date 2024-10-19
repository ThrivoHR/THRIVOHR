"use client"

import { Button } from "@/components/ui/button";
import React from "react";

export default function page() {
  return (
    <div>
      <Button
        onClick={() => {
          window.open("/checkin", "_blank");
        }}
      >
        Check In
      </Button>
    </div>
  );
}
