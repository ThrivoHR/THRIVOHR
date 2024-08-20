"use client";
import Image from "next/image";
import maintain from "/public/maintance.gif";
export default function Error() {
    return (
        <div>
            <div className="flex justify-center align-middle h-100 w-100">
                <Image
                    src={maintain}
                    alt="Left Image"
                    width={150}
                    height={150}
                />

            </div>
            <h1 className="text-center text-4xl mt-20 font-black">Under Maintenance</h1>
        </div>
    );
}

