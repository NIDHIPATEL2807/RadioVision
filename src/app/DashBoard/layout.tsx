
'use client';
import { ReactNode, useEffect, useState } from "react";
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [doctorName, setDoctorName] = useState("Dr. Smith");

  useEffect(() => {
    const storedName = localStorage.getItem("doctorName");
    if (storedName) {
      setDoctorName(storedName);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-5 shadow-lg flex flex-col gap-4">
        <h2 className="text-xl font-bold text-red-600">Doctor Dashboard</h2>
        <button className="w-full flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600">
          Upload Image
        </button>
        <nav className="flex flex-col gap-3 mt-4">
          <Link href="/Dashboard/start-scan" className="flex items-center gap-2 text-gray-700 hover:text-red-500">
            Start Scan
          </Link>
          <Link href="/Dashboard/patients" className="flex items-center gap-2 text-gray-700 hover:text-red-500">
            My Patients
          </Link>
          <Link href="/Dashboard/profile" className="flex items-center gap-2 text-gray-700 hover:text-red-500">
            My Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-600 cursor-pointer">RadioVision</Link>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">{doctorName}</span>
            <img src="/doctor.jpg" alt="Doctor" className="w-10 h-10 rounded-full border border-gray-300" />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
