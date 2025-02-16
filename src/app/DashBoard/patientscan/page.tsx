'use client';

import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function PatientScan() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [aiAnalyses, setAiAnalyses] = useState<{ diagnosis: string; confidence: string; highlightedAreas: string }[]>([]);
  const [patientData, setPatientData] = useState({ name: "", birthday: "", age: "" });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      setSelectedFiles((prev) => {
        prev.forEach((url) => URL.revokeObjectURL(url)); // Cleanup old URLs
        return fileUrls;
      });
      setAiAnalyses([]); // Reset AI analyses when new files are uploaded
    }
  };

  const handleAnalyze = () => {
    const analyses = selectedFiles.map(() => ({
      diagnosis: "Possible fractures detected.",
      confidence: `${Math.floor(Math.random() * 20) + 80}%`, // Random confidence between 80-99%
      highlightedAreas: "Red overlay on affected regions."
    }));
    setAiAnalyses(analyses);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white pt-12 pb-10">
      <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-3xl border border-gray-200">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🩺 Patient Scan & Analysis</h2>
        
        {/* Patient Form */}
        <div className="mb-6">
          <input type="text" name="name" value={patientData.name} onChange={handleInputChange} placeholder="Patient Name" className="w-full p-3 border rounded-md mb-3" />
          <input type="date" name="birthday" value={patientData.birthday} onChange={handleInputChange} className="w-full p-3 border rounded-md mb-3" />
          <input type="number" name="age" value={patientData.age} onChange={handleInputChange} placeholder="Age" className="w-full p-3 border rounded-md" />
        </div>

        {/* Upload Box */}
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-400 p-6 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
          <UploadCloud className="h-12 w-12 text-gray-500 mb-2" />
          <span className="text-gray-600 font-medium">Click to upload or drag & drop multiple files</span>
          <input type="file" multiple className="hidden" onChange={handleFileChange} />
        </label>

        {/* Preview Images & AI Analysis */}
        {selectedFiles.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-md">
                <img src={file} alt={`Uploaded Scan ${index + 1}`} className="w-full max-w-sm rounded-xl shadow-md mb-3" />
                {aiAnalyses[index] && (
                  <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-800">🧠 AI Analysis</h3>
                    <p className="text-gray-700"><strong>Diagnosis:</strong> {aiAnalyses[index].diagnosis}</p>
                    <p className="text-gray-700"><strong>Confidence:</strong> {aiAnalyses[index].confidence}</p>
                    <p className="text-gray-700"><strong>Highlighted Areas:</strong> {aiAnalyses[index].highlightedAreas}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={selectedFiles.length === 0}
          className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-medium text-lg transition-all hover:bg-red-700 disabled:opacity-50"
        >
          🔍 Analyze Scans
        </button>
      </div>
    </div>
  );
}
