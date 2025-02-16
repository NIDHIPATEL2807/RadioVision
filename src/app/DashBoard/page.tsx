'use client';

import { useState } from 'react';
import Link from 'next/link';

const Dashboard = () => {
  const [patients] = useState([
    { id: 'P001', name: 'John Doe', age: 45, condition: 'Fracture' },
    { id: 'P002', name: 'Jane Smith', age: 38, condition: 'MRI Scan Pending' },
    { id: 'P003', name: 'Mark Wilson', age: 50, condition: 'Lung Infection' },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-red-600 mb-6">Patient List</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div key={patient.id} className="p-5 bg-white shadow-lg rounded-xl border border-gray-300">
            <h3 className="text-xl font-medium text-black">{patient.name}</h3>
            <p className="text-gray-700">Age: <span className="font-medium">{patient.age}</span></p>
            <p className="text-gray-700">Condition: <span className="font-medium">{patient.condition}</span></p>
            <Link href={`/dashboard/patient/${patient.id}`} className="text-red-500 font-medium hover:underline mt-3 inline-block">
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
