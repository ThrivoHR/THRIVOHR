import React from "react";
import Sidebar from "@/layout/sidebar/Sidebar";
import Header from "@/layout/header/Header";
import NextBreadcrumb from "@/components/NextBreadcrumb";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen min-w-full overflow-hidden lg:grid-cols-[255px_1fr]">
      <div>
        <Sidebar />
      </div>
      <div>
        <Header />
        {/* <div>
          <NextBreadcrumb
            homeElement={"Home"}
            separator={
              <span>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            }
            activeClasses="text-gray-700 "
            containerClasses="flex py-2 bg-white text-center"
            listClasses="hover:text-gray-700 mx-3 text-sm"
            capitalizeLinks
          />
        </div> */}
        <main className="flex-1 overflow-auto m-3">{children}</main>
      </div>
    </div>
  );
}
