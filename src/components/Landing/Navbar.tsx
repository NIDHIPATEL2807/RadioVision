"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";
import { FaXRay } from "react-icons/fa";

type NavbarProps = {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({ isDark, setIsDark }) => {
  return (
    <nav className={`flex  font-mono justify-between items-center p-6 z-10 relative `}>
      <div className={`text-2xl  flex gap-3 font-bold ${isDark ? "text-white" : "text-black"}`}>
      <div> <FaXRay className="w-10 h-10 text-red-500" />  </div>  RadioVision 
      </div>
      <div className="flex items-center gap-8">
        <Link href="/signup" className={`${isDark ? "text-white" : "text-black"} font-semibold hover:text-red-500`}>Signup</Link>
        <Link href="/signin" className={`${isDark ? "text-white" : "text-black"} font-semibold hover:text-red-500`}>Login</Link>
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg bg-gray-50 hover:bg-gray-200"
        >
          {isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-black" />}
        </button>
      </div>
      
    </nav>
  );
};

export default Navbar;
