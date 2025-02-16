'use client';
import { ReactNode, useEffect, useState } from "react";
import Link from 'next/link';
import { Scan, Users, User } from "lucide-react";
import { FaXRay } from "react-icons/fa";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [doctorName, setDoctorName] = useState("Dr. Smith");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem("doctorName");
    if (storedName) {
      setDoctorName(storedName);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-red-600 p-5  flex flex-col gap-4">
        <Link href="/" className="text-4xl font-bold text-white cursor-pointer"> <FaXRay className="w-14 h-14 text-white ml-20"/>RadioVision</Link>

        
        <nav className="flex flex-col text-white text-xl gap-8 py-3 mt-4">
          <Link href="/Dashboard/start-scan" className="flex items-center gap-2 hover:text-red-500">
            <Scan className="w-6 h-6" /> Start Scan
          </Link>
          <Link href="/Dashboard/patients" className="flex items-center gap-2 hover:text-red-500">
            <Users className="w-6 h-6" /> My Patients
          </Link>
          <Link href="/Dashboard/profile" className="flex items-center gap-2 hover:text-red-500">
            <User className="w-6 h-6" /> My Profile
          </Link>
          <Link href="/Dashboard/patientscan" className="flex items-center gap-2 hover:text-red-500 hover:bg-red-100 hover:border-r-2">
            <User className="w-6 h-6" /> Patient Scan
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-red-600 p-4 flex justify-end items-center">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">{doctorName}</span>
            <img src="/doctor.jpg" alt="Doctor" className="w-10 h-10 rounded-full border border-gray-300" />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-0">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
