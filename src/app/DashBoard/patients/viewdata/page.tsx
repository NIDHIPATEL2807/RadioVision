'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaEnvelope, FaCalendarAlt, FaPills, FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa";

interface Patient {
  name: string;
  age: number;
  gender: string;
  disease: string;
  tests: string;
  doctorNotes: string;
  images: string[];
  email: string;
  medications: { name: string; date: string }[];
  healthProgress: { date: string; glucoseLevel: number }[];
  profileImage: string;
}

const mockPatient: Patient = {
  name: "John Doe",
  age: 45,
  gender: "Male",
  disease: "Diabetes",
  tests: "Blood Sugar, HbA1c",
  doctorNotes: "Regular check-ups needed. Insulin prescribed.",
  images: ["/images/report1.jpg", "/images/report2.jpg"],
  email: "doctor@example.com",
  medications: [
    { name: "Metformin 500mg", date: "Jan 15, 2025" },
    { name: "Insulin Injection (Twice a day)", date: "Feb 1, 2025" }
  ],
  healthProgress: [
    { date: "Jan 1", glucoseLevel: 140 },
    { date: "Feb 1", glucoseLevel: 135 },
    { date: "Mar 1", glucoseLevel: 130 },
    { date: "Apr 1", glucoseLevel: 125 },
  ],
  profileImage: "data:image/png;base64,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",
};

const Viewdata = () => {
  const router = useRouter();
  const [medications, setMedications] = useState(mockPatient.medications);
  const [newMedication, setNewMedication] = useState("");
  const [doctorNotes, setDoctorNotes] = useState(mockPatient.doctorNotes);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [profileImage, setProfileImage] = useState(mockPatient.profileImage);

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [medicationNote, setMedicationNote] = useState("");

  const handleScheduleAppointment = () => {
    if (!appointmentDate || !appointmentTime) {
      alert("Please select a date and time for the appointment.");
      return;
    }
    alert(
      `Appointment Scheduled on ${appointmentDate} at ${appointmentTime} with notes: ${medicationNote}`
    );
  };

  const handleAddMedication = () => {
    if (newMedication.trim()) {
      setMedications([...medications, { name: newMedication, date: new Date().toLocaleDateString() }]);
      setNewMedication("");
    }
  };

  const handleDeleteMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleUpdateDoctorNotes = () => {
    setIsEditingNotes(false);
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Patient Profile */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Patient Profile</h1>
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden shadow-lg relative">
              <Image src={profileImage} alt="Patient Avatar" width={120} height={120} className="rounded-full" />
              <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={handleProfileImageChange} />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h2 className="text-xl font-semibold text-gray-800">{mockPatient.name}</h2>
              <p className="text-gray-600">Age: {mockPatient.age}</p>
              <p className="text-gray-600">Gender: {mockPatient.gender}</p>
              <p className="text-gray-600">Disease: {mockPatient.disease}</p>
              <p className="text-gray-600">Tests Done: {mockPatient.tests}</p>
            </div>
          </div>
        </div>

        {/* Doctor Notes */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaEdit className="mr-2 text-blue-500" /> Doctor's Notes
          </h3>
          {isEditingNotes ? (
            <textarea
              className="w-full mt-2 p-2 border rounded-lg"
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
            />
          ) : (
            <p className="text-gray-600 mt-2 bg-gray-100 p-3 rounded-lg">{doctorNotes}</p>
          )}
          <button
            onClick={() => (isEditingNotes ? handleUpdateDoctorNotes() : setIsEditingNotes(true))}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center"
          >
            {isEditingNotes ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />} {isEditingNotes ? "Save" : "Edit"}
          </button>
        </div>

        {/* Medication Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaPills className="mr-2 text-red-500" /> Medications
          </h3>
          <ul className="mt-2 text-gray-600">
            {medications.map((med, index) => (
              <li key={index} className="py-1 border-b flex justify-between items-center">
                {med.name} <span className="text-sm text-gray-500">({med.date})</span>
                <button onClick={() => handleDeleteMedication(index)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              value={newMedication}
              onChange={(e) => setNewMedication(e.target.value)}
              className="border p-2 rounded-lg flex-1"
              placeholder="Add new medication"
            />
            <button onClick={handleAddMedication} className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600">
              <FaPlus /> Add
            </button>
          </div>
        </div>


        

        {/* Appointment */}
        
    

      {/* Appointment Scheduling Section */}
      <div className="lg:col-span-1 bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Schedule Appointment</h3>
        <div className="mb-4">
          <label className="text-gray-700">Select Date:</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700">Select Time:</label>
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700">Medication Notes:</label>
          <textarea
            placeholder="Add any medication notes..."
            value={medicationNote}
            onChange={(e) => setMedicationNote(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleScheduleAppointment}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Confirm Appointment
        </button>
      </div>
   

      
        <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-6 pr-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Uploaded Reports & Scans:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mockPatient.images.map((img, index) => (
              <div
                key={index}
                className="relative w-full h-48 rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105"
              >
                <Image src={img} alt={`Report ${index + 1}`} layout="fill" objectFit="cover" />
              </div>
            ))}
          </div>
        </div>

        
          
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => window.location.href = "mailto:nidhipatelspit@gmail.com"}
        >
          <FaEnvelope /> Email Patient
        </button>
      
          <button onClick={() => router.back()} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
            Back to Patients
          </button>
        </div>




      </div>
    
  );
};

export default Viewdata;
