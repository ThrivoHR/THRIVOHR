"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [activeLink, setActiveLink] = useState("");

  const linkClasses = (path: string) =>
    `block px-3 py-2 font-medium pl-14 cursor-pointer transition-all ${
      activeLink === path ? "text-blue-800 bg-gray-100" : "text-gray-900 hover:text-gray-700 hover:bg-gray-100"
    }`;

  const handleNavigation = (path: string) => {
    setActiveLink(path);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="hidden lg:flex flex-col h-full border-r bg-white">
        <div className="flex h-[55px] items-center border-b px-6">
          <Link href="#" onClick={() => handleNavigation("#")} className="flex items-center gap-2 font-semibold cursor-pointer">
            <Image src={logo} alt="Logo" width={50} height={50} />
            <Image src={logo2} alt="Logo" width={140} height={140} className="mt-2" />
          </Link>
        </div>
        <div className="flex-1 py-2 overflow-y-auto">
          <nav className="text-sm">
            <Accordion type="multiple">
              <Link href="/home/employee" className={`flex font-medium items-center gap-3 rounded-sm px-3 !pl-3  py-4 cursor-pointer ${linkClasses("/employee")}`} onClick={() => handleNavigation("/employee")}>
                <UserIcon className="w-3 h-3" />
                Information
              </Link>

              <AccordionItem value="contract">
                <AccordionTrigger className="font-medium hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-sm px-3 text-gray-900 transition-all cursor-pointer">
                    <BookUser className="w-4 h-4" />
                    Contract
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Link href="/home/contract/Long-term" className={linkClasses("/home/contract/Long-term")} onClick={() => handleNavigation("/contract/Long-term")}>
                    Long-term contract
                  </Link>
                  <Link href="/home/contract/Short-term" className={linkClasses("/home/contract/Short-term")} onClick={() => handleNavigation("/contract/Short-term")}>
                    Short-term contract
                  </Link>
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
                  <Link href="/home/history/union" className={linkClasses("/home/history/union")} onClick={() => handleNavigation("/history/union")}>
                    Union activities
                  </Link>
                  <Link href="/home/history/workhistory" className={linkClasses("/home/history/workhistory")} onClick={() => handleNavigation("/history/workhistory")}>
                    Career history
                  </Link>
                  <Link href="/home/history/addition" className={linkClasses("/home/history/addition")} onClick={() => handleNavigation("/history/addition")}>
                    Addition
                  </Link>
                  <Link href="/home/history/deduction" className={linkClasses("/home/history/deduction")} onClick={() => handleNavigation("/history/deduction")}>
                    Deduction
                  </Link>
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
                  <Link href="/home/application/absent" className={linkClasses("/home/application/absent")} onClick={() => handleNavigation("/application/absent")}>
                    Absence application
                  </Link>
                  <Link href="/home/application/overtime" className={linkClasses("/home/application/overtime")} onClick={() => handleNavigation("/application/overtime")}>
                    Overtime
                  </Link>
                  <Link href="/home/application/workreport" className={linkClasses("/home/application/workreport")} onClick={() => handleNavigation("/application/workreport")}>
                    Work report
                  </Link>
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
                  <Link href="/home/progress/viewprogress" className={linkClasses("/home/progress/viewprogress")} onClick={() => handleNavigation("/progress/viewprogress")}>
                    View progress
                  </Link>
                  <Link href="/home/progress/reportprogress" className={linkClasses("/home/progress/reportprogress")} onClick={() => handleNavigation("/progress/reportprogress")}>
                    Progress report
                  </Link>
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
                  <Link href="/home/salary/coefficient" className={linkClasses("/home/salary/coefficient")} onClick={() => handleNavigation("/salary/coefficient")}>
                    Coefficient
                  </Link>
                  <Link href="/home/salary/raise" className={linkClasses("/home/salary/raise")} onClick={() => handleNavigation("/salary/raise")}>
                    Raise
                  </Link>
                  <Link href="/home/salary/bonus" className={linkClasses("/home/salary/bonus")} onClick={() => handleNavigation("/salary/bonus")}>
                    Bonus
                  </Link>
                  <Link href="/home/salary/overtimesalary" className={linkClasses("/home/salary/overtimesalary")} onClick={() => handleNavigation("/salary/overtimesalary")}>
                    Overtime salary
                  </Link>
                  <Link href="/home/salary/deductionreport" className={linkClasses("/home/salary/deductionreport")} onClick={() => handleNavigation("/salary/deductionreport")}>
                    Deduction report
                  </Link>
                  <Link href="/home/salary/totalsalary" className={linkClasses("/home/salary/totalsalary")} onClick={() => handleNavigation("/salary/totalsalary")}>
                    Total salary
                  </Link>
                </AccordionContent>
              </AccordionItem>
              <Link href="/home/skill_inventory" className={`flex font-medium items-center gap-3 rounded-sm !pl-3 py-4 cursor-pointer ${linkClasses("/skill_inventory")}`} onClick={() => handleNavigation("/skill_inventory")}>
                <Skill className="w-3 h-3"/>
                Training program
              </Link>
              <Link href="/home/archive" className={`flex font-medium items-center gap-3 rounded-sm !pl-3 py-4 cursor-pointer ${linkClasses("/archive")}`} onClick={() => handleNavigation("/archive")}>
                <Archive className="w-3 h-3"/>
                Archive
              </Link>
            </Accordion>
          </nav>
        </div>
      </div>
    </div>
  );
}
