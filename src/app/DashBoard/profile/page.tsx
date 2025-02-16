import React from 'react';
import { FaUserMd, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';
import { MdWork } from 'react-icons/md';

interface DoctorProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  workload: number;
  education: string;
  description: string;
}

const DoctorProfile = ({
  firstName = "Nidhi",
  lastName = "Patel",
  email = "nidhipatelsprt@gmail.com",
  state = "Andhra Pradesh",
  workload = 74,
  education = "Ph.D | MBBS | Delhi University",
  description = "Demonstrated work in field of Physiology and more than 1k+ successful cases of patients!"
}: DoctorProfileProps) => {
  return (
    <div className="pb-10 max-w-6xl mx-20">
      
      <h2 className="text-4xl font-bold mt-5 mx-5  text-gray-800 mb-6">Doctor's Profile</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mb-4">
              <FaUserMd className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Dr. {firstName} {lastName}</h3>
            <p className="text-gray-600">Physician</p>
            <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center gap-2">
              <span>Follow</span>
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Workload</span>
                <span className="text-gray-600">{workload}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 rounded-full h-2" 
                  style={{ width: `${workload}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <IoMdSchool className="w-5 h-5 text-gray-500 mt-1" />
              <p className="text-gray-700">{education}</p>
            </div>
            
            <div className="flex items-start gap-3">
              <MdWork className="w-5 h-5 text-gray-500 mt-1" />
              <p className="text-gray-700">{description}</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Account Details</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-2">First Name</label>
              <input 
                type="text" 
                value={firstName}
                className="w-full p-2 border rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Last Name</label>
              <input 
                type="text" 
                value={lastName}
                className="w-full p-2 border rounded-md"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                <FaEnvelope className="text-gray-500" />
                <span className="text-gray-700">{email}</span>
              </div>
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Password</label>
              <input 
                type="password" 
                value="••••••••••••"
                className="w-full p-2 border rounded-md"
                readOnly
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Address</label>
            <input 
              type="text" 
              placeholder="Add Your Work Address Here"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-600 mb-2">City</label>
              <input 
                type="text" 
                placeholder="Add Your City Here"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">State</label>
              <input 
                type="text" 
                value={state}
                className="w-full p-2 border rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Zip</label>
              <input 
                type="text" 
                placeholder="Your Pin Code"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Description</label>
            <textarea 
              className="w-full p-2 border rounded-md h-24"
              placeholder="Add your description here..."
            />
          </div>

          <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
            Update Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;