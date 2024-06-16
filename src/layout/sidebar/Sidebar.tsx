import Image from "next/image";
import Link from "next/link";
import logo from "/public/thrivoHR-icon.png";
import logo2 from "/public/thrivoHR-text.png";
import { ContractIcon, UserIcon, WorkIcon } from "@/components/icon";
import { BookUser, CalendarClock, History } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Sidebar() {
  const linkClasses =
    "block px-3 py-2 text-gray-900 hover:text-gray-700 hover:bg-gray-100 focus:bg-blue-200 focus:text-blue-800 pl-14";

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
                className={`flex items-center gap-3 rounded-sm px-3 py-4 text-gray-900 transition-all hover:text-gray-700 hover:bg-gray-100 focus:bg-blue-200 focus:text-blue-800`}
                prefetch={false}
              >
                <UserIcon className="w-3 h-3" />
                Thông tin nhân viên
              </Link>

              <AccordionItem value="contract">
                <AccordionTrigger className="hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-sm px-3 text-gray-900 transition-all">
                    <BookUser className="w-4 h-4" />
                    Hợp đồng lao động
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/home/contract/details"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Hợp đồng dài hạn
                  </Link>
                  <Link
                    href="/home/contract/new"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Hợp đồng ngắn hạn
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="history">
                <AccordionTrigger className="hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-sm px-3 text-gray-900 transition-all">
                    <History className="w-4 h-4" />
                    Quản lý quá trình
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/home/history/view"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Hoạt động công đoàn
                  </Link>
                  <Link
                    href="/home/history/edit"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Quá trình đào tạo
                  </Link>
                  <Link
                    href="/home/history/archive"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Quá trình khen thưởng
                  </Link>
                  <Link
                    href="/home/history/archive"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Quá trình kỷ luật
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="application">
                <AccordionTrigger className="hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-sm px-3 text-gray-900 transition-all">
                    <WorkIcon />
                    Quản lý công tác làm việc
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/home/application/view"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Đơn xin nghỉ
                  </Link>
                  <Link
                    href="/home/application/new"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Tăng ca
                  </Link>
                  <Link
                    href="/home/application/edit"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Báo cáo quá trình làm việc
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="progress">
                <AccordionTrigger className="hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-lg px-3 text-gray-900 transition-all">
                    <CalendarClock className="w-4 h-4" />
                    Quản lý tiến độ dự án
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/home/progress"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Xem tiến độ
                  </Link>
                  <Link
                    href="/home/progress/report"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Báo cáo tiến độ
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="salary">
                <AccordionTrigger className="hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800">
                  <div className="flex items-center gap-3 rounded-lg px-3 text-gray-900 transition-all">
                    <CalendarClock className="w-4 h-4" />
                    Quản lý lương
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/home/progress"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Hệ số lương
                  </Link>
                  <Link
                    href="/home/progress/report"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Khai báo tăng lương
                  </Link>
                  <Link
                    href="/home/progress/report"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Thưởng
                  </Link>
                  <Link
                    href="/home/progress/report"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Lương tăng ca
                  </Link>
                  <Link
                    href="/home/progress/report"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Khai báo các khoản giảm trừ
                  </Link>
                  <Link
                    href="/home/progress/report"
                    prefetch={false}
                    className={linkClasses}
                  >
                    Báo cáo tổng lương
                  </Link>
                </AccordionContent>
              </AccordionItem>
              <Link
                href="/home/employee"
                className={`flex items-center gap-3 rounded-sm px-3 py-4 text-gray-900 transition-all hover:text-gray-700 hover:bg-gray-100 focus:bg-light-blue-100 focus:text-blue-800`}
                prefetch={false}
              >
                Kho lưu trữ
              </Link>
            </Accordion>
          </nav>
        </div>
      </div>
    </div>
  );
}
