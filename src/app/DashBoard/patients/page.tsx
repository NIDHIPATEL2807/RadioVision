
'use client';
import React, { useState } from "react";
import { Search } from "lucide-react";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const patientsList = [
    { name: "John Doe", disease: "Diabetes", tests: "MRI, Blood Test" },
    { name: "Jane Smith", disease: "Hypertension", tests: "ECG, MRI" },
    { name: "Alice Johnson", disease: "Arthritis", tests: "X-Ray, Blood Test" },
    { name: "Michael Brown", disease: "Asthma", tests: "Lung Function Test" },
    { name: "Emily Davis", disease: "Heart Disease", tests: "Echocardiogram" },
  ];

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
        <Search className="absolute left-3 top-3  text-gray-500" size={20} />
      </div>

      {/* Patients Table */}
      <div className="w-full max-w-4xl bg-red-50 shadow-xl rounded-xl p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-red-500 text-white">
              <th className="p-3 text-left">Patient Name</th>
              <th className="p-3 text-left">Disease Type</th>
              
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
                  <td className="p-3">{patient.disease}</td>
                  <td className="p-3">{patient.tests}</td>
                  <td className="p-3 text-center">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                      View More
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
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