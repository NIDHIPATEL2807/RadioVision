import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import BackgroundDots from "./BackgroundDots"; // Dotted background
import Navbar from "./Navbar"; // Navbar for dark mode toggle
import MediConnectCTA from "./MediConnectCTA";
import TextRotate from "./TextRotate";

const LandingPage = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen relative flex flex-col items-center justify-center ${isDark ? "bg-black" : "bg-white"}`}>
      
      {/* Background with animated dots (lower z-index) */}
      <BackgroundDots
        dotSize={1.5}
        dotColor={isDark ? "#ff0033" : "#ff0033"}
        backgroundColor={isDark ? "#000" : "#fff"}
        gap={20}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Navbar Fixed at Top (higher z-index) */}
      <div className="absolute top-0 left-0 w-full border-b-slate-700 shadow-md z-20">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
      </div>

      {/* Main Content Centered (higher z-index) */}
      <main className="container mx-auto px-14 py-32 z-10 text-center mt-24 relative">
        <h1 className={`${isDark ? "text-white" : "text-black"} text-6xl font-extrabold leading-tight tracking-wide`}>
          Empowering and Helping Radiologists with  
          <br /> <span className="text-red-500 text-4xl"> <TextRotate/ ></span>
        </h1>

        <p className={`mt-6 px-12 text-xl ${isDark ? "text-gray-400" : "text-gray-700"}`}>
          Our AI-powered platform assists radiologists in detecting anomalies in MRI, CT scans, 
          and X-rays with unparalleled accuracy. Experience faster, smarter, and more reliable diagnostics.
        </p>

        <button className="mt-8 px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">
          Start Scanning
        </button>

        

      </main>

      <div className="relative w-full min-h-screen flex items-center justify-center">
        <MediConnectCTA isDark={isDark} />
      </div>

    </div>
  );
};

export default LandingPage;
