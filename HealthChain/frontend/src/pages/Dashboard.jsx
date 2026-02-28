import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-900 muted-red-gradient relative overflow-hidden px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/3 w-72 h-72 bg-red-200/25 rounded-full blur-3xl"
          animate={{ scale: [1, 1.16, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-100/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.24, 1], opacity: [0.26, 0.46, 0.26] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="z-10 text-center px-6 premium-panel rounded-3xl py-12 md:py-14 max-w-4xl"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="hc-h1 md:text-[3rem] font-extrabold mb-4 text-hc-700">
          Welcome to <span className="text-red-500">HealthChain</span>
        </h1>

        <p className="hc-body md:text-lg max-w-2xl mx-auto mb-8 text-gray-600">
          The next-generation healthcare platform connecting patients, doctors, and pharmacies seamlessly.
        </p>

        <Link
          to="/select-role"
          className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-200"
          aria-label="Get started with HealthChain"
        >
          Get Started
        </Link>
      </motion.div>

      <motion.div
        className="absolute bottom-10 text-gray-600 text-sm tracking-wide"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Empowering Healthcare with Transparency
      </motion.div>
    </div>
  );
}
