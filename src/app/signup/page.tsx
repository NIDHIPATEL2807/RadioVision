'use client';

import React from "react";
import { useRouter } from "next/navigation";

const SignInUp: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/Dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="relative w-80 h-96 perspective">
      

        {/* Flip Card Container */}
        <div className={`relative w-full h-full transition-transform duration-500 transform`}>
          <div className="absolute w-full h-full bg-white p-6 shadow-md rounded-md flex flex-col items-center backface-hidden transform rotate-y-180">
            <h2 className="text-xl font-bold mb-4 text-red-600">Sign up</h2>
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
              <input type="text" placeholder="Name" className="input-field" required />
              <input type="email" placeholder="Email" className="input-field" required />
              <input type="password" placeholder="Password" className="input-field" required />
              <button type="submit" className="btn">Confirm!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInUp;

