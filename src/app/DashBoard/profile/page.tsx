'use client';
import { useState } from "react";

type Patient = {
  id: string;
  name: string;
  pastScans: string[];
  aiReports: { diagnosis: string; confidence: string }[];
  doctorComments: string;
};

export default function PatientRecords() {
  const [searchQuery, setSearchQuery] = useState("");
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [notes, setNotes] = useState("");

  const patients: Patient[] = [
    { id: "1001", name: "John Doe", pastScans: ["Scan1.png"], aiReports: [{ diagnosis: "Fracture detected", confidence: "90%" }], doctorComments: "Monitor progress" },
    { id: "1002", name: "Jane Smith", pastScans: ["Scan2.png"], aiReports: [{ diagnosis: "No issues detected", confidence: "95%" }], doctorComments: "Routine check-up" },
    { id: "1003", name: "Alice Johnson", pastScans: ["Scan3.png"], aiReports: [{ diagnosis: "Tumor detected", confidence: "85%" }], doctorComments: "Biopsy recommended" },
    { id: "1004", name: "Bob Brown", pastScans: ["Scan4.png"], aiReports: [{ diagnosis: "Lung infection", confidence: "88%" }], doctorComments: "Prescribed antibiotics" },
    { id: "1005", name: "Charlie Davis", pastScans: ["Scan5.png"], aiReports: [{ diagnosis: "Minor fracture", confidence: "80%" }], doctorComments: "Apply cast" },
    { id: "1006", name: "David Lee", pastScans: ["Scan6.png"], aiReports: [{ diagnosis: "Heart abnormality", confidence: "75%" }], doctorComments: "Refer to cardiologist" },
    { id: "1007", name: "Ella Wilson", pastScans: ["Scan7.png"], aiReports: [{ diagnosis: "No issues", confidence: "98%" }], doctorComments: "Regular follow-up" },
    { id: "1008", name: "Frank Adams", pastScans: ["Scan8.png"], aiReports: [{ diagnosis: "Liver disorder", confidence: "85%" }], doctorComments: "Start medication" },
    { id: "1009", name: "Grace Hall", pastScans: ["Scan9.png"], aiReports: [{ diagnosis: "Kidney stones", confidence: "90%" }], doctorComments: "Surgery recommended" },
    { id: "1010", name: "Henry Clark", pastScans: ["Scan10.png"], aiReports: [{ diagnosis: "Brain hemorrhage", confidence: "70%" }], doctorComments: "Emergency attention required" },
  ];

  const handleSearch = () => {
    const foundPatient = patients.find(
      (p) => p.id === searchQuery || p.name.toLowerCase() === searchQuery.toLowerCase()
    );
    if (foundPatient) {
      setPatientData(foundPatient);
      setNotes(foundPatient.doctorComments);
    } else {
      setPatientData(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-red-50 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">Patient Records</h2>
      <input
        type="text"
        placeholder="Search by Patient ID or Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded-md w-full max-w-md mb-4"
      />
      <button onClick={handleSearch} className="px-4 py-2 bg-red-600 text-white rounded-md">
        Search
      </button>
      {patientData && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-lg">
          <h3 className="text-xl font-semibold text-red-600">{patientData.name}</h3>
          <p><strong>ID:</strong> {patientData.id}</p>
          <div className="mt-4">
            <h4 className="font-semibold">Past Scans:</h4>
            <div className="flex gap-2 mt-2">
              {patientData.pastScans.map((scan, index) => (
                <img key={index} src={scan} alt={`Scan ${index + 1}`} className="w-20 h-20 object-cover border" />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">AI Reports:</h4>
            {patientData.aiReports.map((report, index) => (
              <p key={index}><strong>{report.diagnosis}</strong> ({report.confidence})</p>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Doctor's Comments:</h4>
            <textarea
              className="w-full p-2 border rounded-md"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md">
            Save Updates
          </button>
        </div>
      )}
    </div>
  );
}
