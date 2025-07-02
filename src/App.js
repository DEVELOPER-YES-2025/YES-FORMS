import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

// Replace with your Supabase keys
const supabaseUrl = "https://pxclcppdiirguhcjbmqq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4Y2xjcHBkaWlyZ3VoY2pibXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MTY5MDYsImV4cCI6MjA2Njk5MjkwNn0.WQWpSH1cL_LAL3NBK-ZCYCzOL_V7oDHo99jnyilBqeM";
const supabase = createClient(supabaseUrl, supabaseKey);


function App() {
  const [formData, setFormData] = useState({
    aadhar_number: "",
    full_name: "",
    dob: "",
    iti_name: "",
    trade_name: "",
    training_period: "1 Year",
    passing_year: "",
    phone_number: "",
    current_address: "",
    naps_registered: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone_number") {
      const sanitized = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
    } else if (name === "aadhar_number") {
      const sanitized = value.replace(/\D/g, "").slice(0, 12);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
    } else if (name === "passing_year") {
      const sanitized = value.replace(/\D/g, "").slice(0, 4);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("personal_details").insert([formData]);
    setLoading(false);
    if (!error) {
      setShowModal(true);
      setFormData({
        aadhar_number: "",
        full_name: "",
        dob: "",
        iti_name: "",
        trade_name: "",
        training_period: "1 Year",
        passing_year: "",
        phone_number: "",
        current_address: "",
        naps_registered: "",
      });
      setTimeout(() => setShowModal(false), 2500);
    } else {
       console.error("Supabase Insert Error:", error);
      alert("Submission failed: "+ error.message);
    }
  };

  return (
    <div 
    className="flex items-center justify-center min-h-screen p-4 bg-cover bg-center"
    style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-x2 max-w-md w-full relative">
        
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-4">
          Registration For ITI Apprenticeship In Nagpur
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-1">Aadhar Card Number</label>
              <div className="flex space-x-4">
                  <input
                    type="text"
                    name="aadhar_number"
                    placeholder="Aadhar Card Number"
                    required
                    value={formData.aadhar_number}
                    onChange={handleChange}
                    className="border p-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                 />
              </div>
          </div>

          
          <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
          </div>


          <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-1">Date Of Birth</label>
              <div className="flex space-x-4">
                  <input
                    type="date"
                    name="dob"
                    placeholder="Date Of Birth"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
              </div>
          </div>

          <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-1">Name of ITI with Taluka and District</label>
              <div className="flex space-x-4">
                  <input
                    type="text"
                    name="iti_name"
                    placeholder="Name of ITI with Taluka and District"
                    required
                    value={formData.iti_name}
                    onChange={handleChange}
                    className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
              </div>
          </div>

          <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-1">Name of Trade</label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="trade_name"
                  placeholder="Name of Trade"
                  required
                  value={formData.trade_name}
                  onChange={handleChange}
                  className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
          </div>


          <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-1">Training Period</label>
              <div className="flex space-x-4">
                <select
                  name="training_period"
                  required
                  value={formData.training_period}
                  onChange={handleChange}
                  className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Year</option>
                </select>
              </div>
          </div>


          <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-1">ITI Passing Year / Exam Appeared Year</label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="passing_year"
                  placeholder="ITI Passing Year / Exam Appeared Year"
                  required
                  value={formData.passing_year}
                  onChange={handleChange}
                  className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
          </div>

          
          <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Phone Number"
                  required
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
          </div>


          <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-1">Residing Address</label>
              <div className="flex space-x-4">
                <textarea
                  name="current_address"
                  placeholder="Current Address"
                  required
                  value={formData.current_address}
                  onChange={handleChange}
                  className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                ></textarea>
              </div>
          </div>


          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">NAPS Portal Registered</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="naps_registered"
                  value="Yes"
                  checked={formData.naps_registered === "Yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="naps_registered"
                  value="No"
                  checked={formData.naps_registered === "No"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
         </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded w-full font-semibold transition transform hover:scale-105 active:scale-95"
          >
            {loading ? "Submitting..." : "Submit Details"}
          </button>

        </form>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center animate-fade-in-up">
              <h2 className="text-xl font-semibold text-green-600 mb-2">
                ✅ Submitted!
              </h2>
              <p className="text-gray-600">Form submitted successfully.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

