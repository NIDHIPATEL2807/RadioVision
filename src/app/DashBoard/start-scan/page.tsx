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
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Upload Medical Scan</h2>
        <label className="flex flex-col items-center border-2 border-dashed p-6 rounded-lg cursor-pointer">
          <UploadCloud className="h-10 w-10 text-gray-500" />
          <span className="text-gray-500">Click to upload or drag and drop</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
        {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Uploaded Scan" className="max-w-full h-auto mt-4" />}
        <button 
          onClick={handleAnalyze} 
          disabled={!selectedFile} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50">
          Analyze Scan
        </button>
        {aiAnalysis && (
          <div className="p-4 border rounded-lg bg-gray-100 mt-4">
            <h3 className="font-semibold">AI Analysis</h3>
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