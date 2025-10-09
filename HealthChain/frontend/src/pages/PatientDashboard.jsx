import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

export default function PatientDashboard({ user }) {
  const [data, setData] = useState(null);

  if (!user) return <Navigate to="/signin" />;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/patients/me");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching patient data:", err);
      }
    }
    fetchData();
  }, []);

  if (!data) return <div className="text-center text-white pt-32">Loading patient data...</div>;

  const { patient = {}, prescriptions = [], appointments = [] } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-red-800 text-white p-10 pt-24">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome, {patient.name || "Patient"}</h1>

      <motion.div
        className="bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-3">Patient Info</h2>
        <p><strong>Blood Group:</strong> {patient.bloodGroup || "N/A"}</p>
        <p><strong>Allergies:</strong> {patient.allergies?.join(", ") || "None"}</p>
        <p><strong>Current Status:</strong> {patient.currentStatus?.status || "N/A"}</p>
        <p><strong>Medicines:</strong> {patient.medicines?.length ? patient.medicines.join(", ") : "No current medicines"}</p>
      </motion.div>

      <motion.div
        className="bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-3">Assigned Doctor</h2>
        <p>{patient.assignedDoctor?.name || "N/A"}</p>
        <p>{patient.assignedDoctor?.specialty || "N/A"}</p>
        <p>{patient.assignedDoctor?.phone || "N/A"}</p>
      </motion.div>
    </div>
  );
}
