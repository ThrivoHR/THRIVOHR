"use client";

import { useEffect } from "react";
import Image from "next/image";
import maintain from "/public/maintance.gif";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="flex justify-center align-middle">
            <Image
              src={maintain}
              alt="Maintenance Image"
              width={150}
              height={150}
            />
          </div>
          <h1 className="text-center text-4xl mt-10 font-black">
            Under Maintenance
          </h1>
          <p className="text-center text-lg mt-4 text-gray-500">
            Something went wrong. Please try again later.
          </p>
          <Link href="/home">
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500">
              Try Again
            </button>
          </Link>
        </div>
      </body>
    </html>
  );
}
