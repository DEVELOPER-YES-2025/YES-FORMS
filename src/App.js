import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Supabase setup
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
    let sanitized = value;

    if (name === "phone_number") {
      sanitized = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "aadhar_number") {
      sanitized = value.replace(/\D/g, "").slice(0, 12);
    } else if (name === "passing_year") {
      sanitized = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [name]: sanitized }));
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
    } else {
      console.error("Supabase Insert Error:", error);
      alert("Submission failed: " + error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Responsive Background */}
      <div
        className="
          absolute inset-0 z-0
          bg-cover bg-center bg-no-repeat
          bg-[url('/src/assets/images/bg-mobile.jpg')]
          sm:bg-[url('/src/assets/images/bg.jpg')]
        "
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Form Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg max-w-md w-full"
      >
        <h1 className="text-2xl font-bold text-center text-navy mb-4">
          Registration For ITI Apprenticeship In Nagpur
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Aadhar Card Number", name: "aadhar_number", type: "text", placeholder: "Enter Aadhar Number" },
            { label: "Full Name", name: "full_name", type: "text", placeholder: "Enter Full Name" },
            { label: "Date Of Birth", name: "dob", type: "date", placeholder: "" },
            { label: "Name of ITI with Taluka and District", name: "iti_name", type: "text", placeholder: "Enter ITI Name" },
            { label: "Name of Trade", name: "trade_name", type: "text", placeholder: "Enter Trade Name" },
            { label: "ITI Passing Year / Exam Appeared Year", name: "passing_year", type: "text", placeholder: "Enter Year" },
            { label: "Phone Number", name: "phone_number", type: "text", placeholder: "Enter Phone Number" },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-gray-700 font-medium mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required
                value={formData[field.name]}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Training Period</label>
            <select
              name="training_period"
              required
              value={formData.training_period}
              onChange={handleChange}
              className="input-field"
            >
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Residing Address</label>
            <textarea
              name="current_address"
              placeholder="Enter Current Address"
              required
              value={formData.current_address}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">NAPS Portal Registered</label>
            <div className="flex space-x-4">
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="naps_registered"
                    value={option}
                    checked={formData.naps_registered === option}
                    onChange={handleChange}
                    className="form-radio accent-mustard"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-mustard hover:bg-yellow-400 text-darknavy py-3 rounded-full w-full font-semibold transition-transform transform hover:scale-105 active:scale-95"
          >
            {loading ? "Submitting..." : "Submit Details"}
          </button>
        </form>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full animate-fade-in-up">
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                ✅ Submission Successful!
              </h2>
              <p className="text-gray-700 mb-4">
                Your data has been submitted successfully. We will contact you soon.
              </p>
              <p className="text-red-600 font-semibold mb-2">Important:</p>
              <p className="text-gray-700 mb-4">
                If you are not registered on the NAPS Portal, please register before proceeding further.
              </p>
              <a
                href="https://www.apprenticeshipindia.gov.in/candidate-login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-2 px-4 rounded-lg hover:scale-105 transition-transform mb-3"
              >
                Register on NAPS Portal
              </a>
              <button
                onClick={() => setShowModal(false)}
                className="mt-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
      <ScrollToTopButton />
    </div>
  );
}

export default App;