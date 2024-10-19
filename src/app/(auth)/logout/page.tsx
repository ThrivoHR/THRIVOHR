"use client";
import authApiRequest from "@/apiRequest/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function LogoutLogic() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const sessionToken = searchParams ? searchParams.get("sessionToken") : null;
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (sessionToken === localStorage.getItem("sessionToken")) {
      authApiRequest
        .logoutFromNextClientToNextServer(true, signal)
        .then((res) => {
          router.push(`/login`);
        });
    }
    return () => {
      controller.abort();
      
    };
  }, [sessionToken, router, pathname]);
  return <div></div>;
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  );
}