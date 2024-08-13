import type { Metadata } from "next";
import { Inter } from "next/font/google";
import logo from "/public/thrivoHR-icon.png";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThrivoHR",
  description: "Human Resource Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>    
      </head>
      <body className={inter.className}> {children}</body>
    </html>
  );
}
