// src/pages/Welcome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mt-12"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-hc-700 mb-4">Welcome to HealthChain</h1>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">Securely manage health records, appointments and prescriptions — presented with a glossy, modern UI.</p>

        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={() => navigate("/select-role")}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-full font-semibold btn-gloss"
          >
            Get Started
          </motion.button>

          <motion.button
            onClick={() => navigate("/about")}
            whileHover={{ scale: 1.02, y: -2 }}
            className="px-6 py-3 rounded-full border border-red-200 text-red-700 bg-white/90"
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
