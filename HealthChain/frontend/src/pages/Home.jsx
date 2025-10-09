import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-animated-gradient min-h-screen flex flex-col justify-center items-center text-white text-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold mb-4 drop-shadow-lg"
      >
        Welcome to HealthChain
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="max-w-xl text-lg mb-8"
      >
        Securely connect patients, doctors, and pharmacies in a unified healthcare system.
      </motion.p>
      <Link
        to="/login"
        className="bg-white text-primary px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
      >
        Get Started
      </Link>
    </div>
  );
}
