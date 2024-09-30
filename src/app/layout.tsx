import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AppProvider from "./app-provider";
import { ProjectProvider } from "./project-context";

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
      <body className={inter.className}>
        <Toaster position="top-center" reverseOrder={false} />
        <ProjectProvider>
          <AppProvider>{children}</AppProvider>
        </ProjectProvider>
      </body>
    </html>
  );
}
