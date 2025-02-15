import React from "react";

type MediConnectCTAProps = {
  isDark: boolean;
};

const MediConnectCTA: React.FC<MediConnectCTAProps> = ({ isDark }) => {
  return (
    <div className={`text-center py-6 px-36 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <h2 className="text-4xl font-bold leading-tight">
        Ready to Transform Your Healthcare Experience?
      </h2>
      <p className="mt-4  px-20 text-lg">
        Join thousands of users already benefiting from <span className="text-red-500 font-semibold">MediConnect</span>'s innovative solutions.
        Whether you're a patient or a healthcare provider, we're here to make healthcare <strong>simpler, faster, and more effective.</strong>
      </p>
      
      {/* Buttons */}
      <div className="mt-8 flex justify-center gap-6">
        <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-lg">
          Get Started
        </button>
        <button className={`px-6 py-3 border-2 rounded-lg transition ${isDark ? "border-white text-white hover:bg-white hover:text-black" : "border-black text-black hover:bg-black hover:text-white"}`}>
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default MediConnectCTA;
