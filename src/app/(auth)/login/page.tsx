import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from "/public/thrivoHR-icon.png";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm p-3">
        <div className="container mx-auto flex items-center justify-between">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <h1 className="text-xl font-bold">ThrivoHR</h1>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex gap-32 items-center">
          <div className="flex items-center justify-center">
            <Image
              src="https://i.pinimg.com/564x/d1/64/26/d16426da270979ed4715325f6c972f42.jpg"
              alt="Left Image"
              width={500}
              height={500}
            />
          </div>
          <div className="w-[70%] p-6 bg-white rounded-lg shadow-lg space-y-8">
            <div className="text-left space-y-4">
              <h2 className="text-3xl font-bold">ThrivoHR</h2>
              <p className="text-gray-500">Where HR Thrives!</p>
            </div>
            <form className="space-y-7">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="border-t border-gray-200 py-4"></div>
              <Link href="/home/employee">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-400 text-white font-semibold rounded-md shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
