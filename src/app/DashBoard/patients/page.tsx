"use client";

import React from "react";

const patients = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">My Patients</h1>
      <p>View and manage your patients' records.</p>
      <ul className="mt-4">
        <li className="p-2 bg-gray-100 rounded-md shadow-sm mb-2">Patient 1 - John Doe</li>
        <li className="p-2 bg-gray-100 rounded-md shadow-sm mb-2">Patient 2 - Jane Smith</li>
        <li className="p-2 bg-gray-100 rounded-md shadow-sm mb-2">Patient 3 - Alice Johnson</li>
      </ul>
    </div>
  );
};

export default patients;
