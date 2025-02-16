'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";

const SignInUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    router.push("/DashBoard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-400 to-red-600">
      <div className="w-[22rem] bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 flex flex-col items-center">
        
        <h2 className="text-2xl font-bold text-white mb-4">Welcome Back</h2>

        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          {/* Name Input */}
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 bg-transparent border border-white/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white/70 placeholder-white/70"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-transparent border border-white/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white/70 placeholder-white/70"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-transparent border border-white/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white/70 placeholder-white/70"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white text-red-600 font-semibold py-2 rounded-md hover:bg-red-500 hover:text-white transition"
          >
            Let's Go!
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-200 mt-4">{error}</p>}

        {/* Divider */}
        <div className="flex items-center w-full my-4">
          <hr className="w-full border-white/30" />
          <span className="mx-2 text-white/70 text-sm">OR</span>
          <hr className="w-full border-white/30" />
        </div>

        {/* Social Logins */}
        <div className="flex justify-center gap-4">
          <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition">
            <FaGoogle size={22} className="text-white" />
          </button>
          <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition">
            <FaGithub size={22} className="text-white" />
          </button>
          <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition">
            <FaLinkedin size={22} className="text-white" />
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-white/70 text-sm mt-4">
          Don't have an account?  
          <button className="text-white font-semibold hover:underline ml-1">Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default SignInUp;
