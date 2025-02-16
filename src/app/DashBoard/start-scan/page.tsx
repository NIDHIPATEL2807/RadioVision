"use client"

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import axios from "axios";

export default function StartScan() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<{
    disease: string;
    probability: number;
  } | null>(null);
  const [doctorNotes, setDoctorNotes] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAiAnalysis({
        disease: response.data.disease,
        probability: response.data.probability,
      });
    } catch (error) {
      console.error("Error analyzing the scan:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-0">
      <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-3xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🩺 Upload & Analyze Medical Scans</h2>
      <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-400 p-6 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
          <UploadCloud className="h-10 w-10 text-gray-500" />
          <span className="text-gray-600 font-medium">Click to upload or drag & drop multiple files</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
        {selectedFile && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <img src={URL.createObjectURL(selectedFile)} alt="Uploaded Scan" className="max-w-full h-auto mt-4" />
          </div>
        )}
        <button 
          onClick={handleAnalyze} 
          disabled={!selectedFile} 
          className="mt-6 w-full bg-red-700 text-white py-3 rounded-lg font-medium text-lg transition-all hover:bg-blue-700 disabled:opacity-50">
          Analyze Scan
        </button>
        {aiAnalysis && (
          <div className="mt-6 p-6 rounded-xl bg-gray-100 text-black shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">🧠 AI Analysis</h3>
            <p><strong>Disease:</strong> {aiAnalysis.disease}</p>
            <p><strong>Probability:</strong> {aiAnalysis.probability.toFixed(2)}%</p>
          </div>
        )}
        <textarea
          placeholder="Doctor's Notes"
          value={doctorNotes}
          onChange={(e) => setDoctorNotes(e.target.value)}
          className="w-full mt-4 p-2 border rounded-md"
        />
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
          Save Report
        </button>
      </div>
    </div>
  );
}