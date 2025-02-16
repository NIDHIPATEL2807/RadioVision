'use client';
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import Link from "next/link";

interface Patient {
  name: string;
  age: number;
  gender: string;
  disease: string;
  tests: string;
}

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patientsList, setPatientsList] = useState<Patient[]>([]);

  useEffect(() => {
    // Mock data (Replace with API call when needed)
    const mockPatients: Patient[] = [
      { name: "John Doe", age: 45, gender: "Male", disease: "Diabetes", tests: "Blood Sugar, HbA1c" },
    ];
    setPatientsList(mockPatients);

    // Uncomment when using API:
    /*
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://127.0.0.1:8000/getPatients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatientsList(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
    */
  }, []);

  const filteredPatients = patientsList.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">My Patients</h1>
      <p className="text-gray-700 mb-6">View and manage your patients' records.</p>

      {/* Search Bar */}
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full p-3 pl-10 border border-red-300 rounded-xl shadow-md focus:ring-2 focus:ring-red-400 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-3 text-gray-500" size={20} />
      </div>

      {/* Patients Table */}
      <div className="w-full max-w-4xl bg-red-50 shadow-xl rounded-xl p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-red-500 text-white">
              <th className="p-3 text-left">Patient Name</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Disease</th>
              <th className="p-3 text-left">Tests Done</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <tr
                  key={index}
                  className="border-b border-red-200 hover:bg-red-100 transition"
                >
                  <td className="p-3">{patient.name}</td>
                  <td className="p-3">{patient.age}</td>
                  <td className="p-3">{patient.gender}</td>
                  <td className="p-3">{patient.disease}</td>
                  <td className="p-3">{patient.tests}</td>
                  <td className="p-3 text-center">
                    

                  <Link href="/DashBoard/patients/viewdata">
  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
    View Details
  </button>
</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No matching patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
