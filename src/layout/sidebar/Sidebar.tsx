import Image from "next/image";
import Link from "next/link";
import logo from "/public/thrivoHR-icon.png";
import logo2 from "/public/thrivoHR-text.png";
import { Archive, ContractIcon, Salary, UserIcon, WorkIcon } from "@/components/icon";
import { BookUser, CalendarClock, History } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Sidebar() {
  const linkClasses =
    "block px-3 py-2 font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-100 focus:text-blue-800 pl-14";

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="hidden lg:flex flex-col h-full border-r bg-white">
        <div className="flex h-[55px] items-center border-b px-6">
          <Link
            href="#"
            className="flex items-center gap-2 font-semibold"
            prefetch={false}
          >
            <Image src={logo} alt="Logo" width={50} height={50} />
            <Image src={logo2} alt="Logo" width={140} height={140} />
          </Link>
        </div>
        <div className="flex-1 py-2 overflow-y-auto">
          <nav className="text-sm">
            <Accordion type="multiple">
              <Link
                href="/home/employee"
                className={`flex font-medium items-center gap-3 rounded-sm px-3 py-4 text-gray-900 transition-all hover:text-gray-700 hover:bg-gray-100 focus:text-blue-800`}
                prefetch={false}
              >
                <UserIcon className="w-3 h-3" />
                Information
              </Link>

              <AccordionItem value="contract">
                <AccordionTrigger className="font-medium hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-sm px-3 text-gray-900 transition-all">
                    <BookUser className="w-4 h-4" />
                    Contract
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/home/contract/longterm"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Long-term contract
                  </Link>
                  <Link
                    href="/home/contract/shortterm"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Short-term contract
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="history">
                <AccordionTrigger className="font-medium hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-sm px-3 text-gray-900 transition-all">
                    <History className="w-4 h-4" />
                    Career
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/home/history/union"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Union activities
                  </Link>
                  <Link
                    href="/home/history/workhistory"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Career history
                  </Link>
                  <Link
                    href="/home/history/addition"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Addition
                  </Link>
                  <Link
                    href="/home/history/deduction"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Deduction
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="application">
                <AccordionTrigger className="font-medium hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-sm px-3 text-gray-900 transition-all">
                    <WorkIcon />
                    Application 
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/home/application/absent"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Absence application
                  </Link>
                  <Link
                    href="/home/application/overtime"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Overtime
                  </Link>
                  <Link
                    href="/home/application/workreport"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Work report
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="progress">
                <AccordionTrigger className="font-medium hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-lg px-3 text-gray-900 transition-all">
                    <CalendarClock className="w-4 h-4" />
                    Project management
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/home/progress/viewprogress"
                    prefetch={false}
                    className={linkClasses}
                  >
                    View progress
                  </Link>
                  <Link
                    href="/home/progress/reportprogress"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Progress report
                  </Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="salary">
                <AccordionTrigger className="font-medium hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-lg px-3 text-gray-900 transition-all">

                    <Salary className="w-4 h-4" />
                    Payroll
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/home/salary/coefficient"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Coefficient
                  </Link>
                  <Link
                    href="/home/salary/raise"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Raise
                  </Link>
                  <Link
                    href="/home/salary/bonus"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Bonus
                  </Link>
                  <Link
                    href="/home/salary/overtimesalary"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Overtime salary
                  </Link>
                  <Link
                    href="/home/salary/deductionreport"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Deduction report
                  </Link>
                  <Link
                    href="/home/salary/totalsalary"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Total salary
                  </Link>
                </AccordionContent>
              </AccordionItem>
              <Link
                href="/home/archive"
                className={`font-medium flex items-center gap-3 rounded-sm px-3 py-4 text-gray-900 transition-all hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800`}
                prefetch={false}
              >
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
