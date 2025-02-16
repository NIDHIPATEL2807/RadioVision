"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import MediConnectCTA from "./MediConnectCTA";
import Testimonials from "./Testimonials";

const Home: React.FC = () => {
  const [isDark, setIsDark] = useState(false); // Manage dark mode state

  return (
    <div className="font-mono">
      {/* <Navbar isDark={isDark} setIsDark={setIsDark} /> */}
      <LandingPage />
      {/* <MediConnectCTA isDark={isDark}/> */}
      {/* <Testimonials/> */}
      <Footer/>
    
    </div>
  );
};

export default Home;
