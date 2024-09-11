"use client";

import React from "react";
import Sidebar from "@/layout/sidebar/Sidebar";
import Header from "@/layout/header/Header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[255px_1fr]">
      <div className="fixed inset-y-0 left-0 w-[255px] h-full bg-white border-r z-20">
        <Sidebar />
      </div>
      <div className="lg:ml-[255px] w-full flex flex-col">
        <header className="fixed top-0 left-0 right-0 h-[55px] bg-white border-b z-10">
          <Header />
        </header>
      </div>
      <main className="mt-[55px] h-[calc(100vh-55px)] overflow-auto p-4">
          {children}
        </main>
    </div>
  );
}
