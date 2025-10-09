// src/pages/SelectRole.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    type: "Patient",
    desc: "Access your health records, prescriptions, and updates.",
    color: "from-red-500 to-red-700",
  },
  {
    type: "Doctor",
    desc: "Manage your patients and update medical records.",
    color: "from-blue-500 to-blue-700",
  },
  {
    type: "Pharmacy",
    desc: "View prescriptions and manage medicine deliveries.",
    color: "from-green-500 to-green-700",
  },
];

export default function SelectRole() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-500 via-red-600 to-red-800 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold mb-8"
      >
        Choose Your Role
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {roles.map((role, index) => (
          <motion.div
            key={role.type}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`p-6 rounded-2xl shadow-xl bg-gradient-to-br ${role.color} cursor-pointer`}
            onClick={() => navigate("/signin", { state: { role: role.type } })}
          >
            <h2 className="text-2xl font-bold mb-3">{role.type}</h2>
            <p className="opacity-90">{role.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
