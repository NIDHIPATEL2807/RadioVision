'use client';

import { useState } from 'react';
import Link from 'next/link';

const dashboard = () => {
  const [patients] = useState([
    { id: 'P001', name: 'John Doe', age: 45, condition: 'Fracture' },
    { id: 'P002', name: 'Jane Smith', age: 38, condition: 'MRI Scan Pending' },
    { id: 'P003', name: 'Mark Wilson', age: 50, condition: 'Lung Infection' },
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">Patient List</h1>
      <div className="grid grid-cols-3 gap-4">
        {patients.map((patient) => (
          <div key={patient.id} className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-black">{patient.name}</h3>
            <p className="text-gray-600">Age: {patient.age}</p>
            <p className="text-gray-600">Condition: {patient.condition}</p>
            <Link href={`/dashboard/patient/${patient.id}`} className="text-red-500 hover:underline mt-2 inline-block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dashboard;
