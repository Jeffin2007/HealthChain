// src/pages/Dashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-red-700 via-red-600 to-red-800 relative overflow-hidden">
      {/* Animated circles background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/3 w-72 h-72 bg-red-500/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-400/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="z-10 text-center px-6"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to <span className="text-white/90">HealthChain</span>
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
          The next-generation healthcare platform connecting patients, doctors, and pharmacies seamlessly.
        </p>

        <Link
          to="/select-role"
          className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-red-500 to-red-700 shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
        >
          Get Started
        </Link>
      </motion.div>

      {/* Subtle floating animation for logo */}
      <motion.div
        className="absolute bottom-10 text-white/60 text-sm"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Empowering Healthcare with Transparency
      </motion.div>
    </div>
  );
}