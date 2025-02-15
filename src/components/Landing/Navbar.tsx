"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

type NavbarProps = {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({ isDark, setIsDark }) => {
  return (
    <nav className={`flex justify-between items-center p-6 z-10 relative `}>
      <div className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>
       RadioVision
      </div>
      <div className="flex items-center gap-4">
        <Link href="/Dashboard" className={`${isDark ? "text-white" : "text-black"} font-semibold hover:text-gray-500`}>Dashboard</Link>
        <Link href="/signin" className={`${isDark ? "text-white" : "text-black"} font-semibold hover:text-gray-500`}>Doctor Login</Link>
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
