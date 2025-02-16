'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignIn: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      router.push("/Dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="relative w-80 h-96 perspective">
        <div className={`relative w-full h-full transition-transform duration-500 transform`}>
          <div className="absolute w-full h-full bg-white p-6 shadow-md rounded-md flex flex-col items-center backface-hidden">
            <h2 className="text-xl font-bold mb-4 text-red-600">Log in</h2>
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn bg-red-500 p-3 text-white">Let's go!</button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;