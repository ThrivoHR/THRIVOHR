"use client";  // Add this directive at the top

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "/public/thrivoHR-icon.png";
import logo2 from "/public/thrivoHR-text.png";
import { Archive, Salary, Skill, UserIcon, WorkIcon } from "@/components/icon";
import { BookUser, CalendarClock, History } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Sidebar() {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");

  const linkClasses = (path: string) =>
    `block px-3 py-2 font-medium pl-14 cursor-pointer transition-all ${
      activeLink === path ? "text-blue-800 bg-gray-100" : "text-gray-900 hover:text-gray-700 hover:bg-gray-100"
    }`;

  const handleNavigation = (path: string) => {
    setActiveLink(path);
    router.push(path);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="hidden lg:flex flex-col h-full border-r bg-white">
        <div className="flex h-[55px] items-center border-b px-6">
          <div
            onClick={() => handleNavigation("#")}
            className="flex items-center gap-2 font-semibold cursor-pointer"
          >
            <Image src={logo} alt="Logo" width={50} height={50} />
            <Image src={logo2} alt="Logo" width={140} height={140} />
          </div>
        </div>
        <div className="flex-1 py-2 overflow-y-auto">
          <nav className="text-sm">
            <Accordion type="multiple">
              <div
                onClick={() => handleNavigation("/home/employee")}
                className={`flex font-medium items-center gap-3 rounded-sm px-3 !pl-3  py-4 cursor-pointer ${linkClasses("/home/employee")}`}
              >
                <UserIcon className="w-3 h-3" />
                Information
              </div>

              <AccordionItem value="contract">
                <AccordionTrigger className="font-medium hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-sm px-3 text-gray-900 transition-all cursor-pointer">
                    <BookUser className="w-4 h-4" />
                    Contract
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    onClick={() => handleNavigation("/home/contract/Long-term")}
                    className={linkClasses("/home/contract/Long-term")}
                  >
                    Long-term contract
                  </div>
                  <div
                    onClick={() => handleNavigation("/home/contract/Short-term")}
                    className={linkClasses("/home/contract/Short-term")}
                  >
                    Short-term contract
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="history">
                <AccordionTrigger className="font-medium hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-sm px-3 text-gray-900 transition-all cursor-pointer">
                    <History className="w-4 h-4" />
                    Career
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    onClick={() => handleNavigation("/home/history/union")}
                    className={linkClasses("/home/history/union")}
                  >
                    Union activities
                  </div>
                  <div
                    onClick={() => handleNavigation("/home/history/workhistory")}
                    className={linkClasses("/home/history/workhistory")}
                  >
                    Career history
                  </div>
                  <div
                    onClick={() => handleNavigation("/home/history/addition")}
                    className={linkClasses("/home/history/addition")}
                  >
                    Addition
                  </div>
                  <div
                    onClick={() => handleNavigation("/home/history/deduction")}
                    className={linkClasses("/home/history/deduction")}
                  >
                    Deduction
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="application">
                <AccordionTrigger className="font-medium hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-sm px-3 text-gray-900 transition-all cursor-pointer">
                    <WorkIcon />
                    Application 
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    onClick={() => handleNavigation("/home/application/absent")}
                    className={linkClasses("/home/application/absent")}
                  >
                    Absence application
                  </div>
                  <div
                    onClick={() => handleNavigation("/home/application/overtime")}
                    className={linkClasses("/home/application/overtime")}
                  >
                    Overtime
                  </div>
                  <div
                    onClick={() => handleNavigation("/home/application/workreport")}
                    className={linkClasses("/home/application/workreport")}
                  >
                    Work report
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="progress">
                <AccordionTrigger className="font-medium hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-lg px-3 text-gray-900 transition-all cursor-pointer">
                    <CalendarClock className="w-4 h-4" />
                    Project management
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    onClick={() => handleNavigation("/home/progress/viewprogress")}
                    className={linkClasses("/home/progress/viewprogress")}
                  >
                    View progress
                  </div>
                  <div
                    onClick={() => handleNavigation("/home/progress/reportprogress")}
                    className={linkClasses("/home/progress/reportprogress")}
                  >
                    Progress report
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="salary">
                <AccordionTrigger className="font-medium hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-lg px-3 text-gray-900 transition-all cursor-pointer">
                    <Salary className="w-4 h-4" />
                    Payroll
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    onClick={() => handleNavigation("/home/salary/coefficient")}
                    className={linkClasses("/home/salary/coefficient")}
                  >
                    Coefficient
                  </div>
                  <div
                    onClick={() => handleNavigation("/home/salary/raise")}
                    className={linkClasses("/home/salary/raise")}
                  >
                    Raise
                  </div>
                  <div
                    onClick={() => handleNavigation("/home/salary/bonus")}
                    className={linkClasses("/home/salary/bonus")}
                  >
                    Bonus
                  </div>
                  <div
                    onClick={() => handleNavigation("/home/salary/overtimesalary")}
                    className={linkClasses("/home/salary/overtimesalary")}
                  >
                    Overtime salary
                  </div>
                  <div
                    onClick={() => handleNavigation("/home/salary/deductionreport")}
                    className={linkClasses("/home/salary/deductionreport")}
                  >
                    Deduction report
                  </div>
                  <div
                    onClick={() => handleNavigation("/home/salary/totalsalary")}
                    className={linkClasses("/home/salary/totalsalary")}
                  >
                    Total salary
                  </div>
                </AccordionContent>
              </AccordionItem>
              <div
              onClick={() => handleNavigation("/home/skill_inventory")}
              className={`flex font-medium items-center gap-3 rounded-sm !pl-3 py-4 cursor-pointer ${linkClasses("/home/skill_inventory")}`}>
                <Skill className="w-3 h-3"/>
                Skill Inventory
              </div>
              <div
                onClick={() => handleNavigation("/home/archive")}
                className={`flex font-medium items-center gap-3 rounded-sm !pl-3 py-4 cursor-pointer ${linkClasses("/home/archive")}`}
              >
                <Archive className="w-3 h-3"/>
                Archive
              </div>
            </Accordion>
          </nav>
        </div>
      </div>
    </div>
  );
}
