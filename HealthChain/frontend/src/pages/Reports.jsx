import React from "react";
import { motion } from "framer-motion";

export default function Reports() {
  return (
    <div className="p-8">
      <motion.h2 initial={{opacity:0}} animate={{opacity:1}} className="text-3xl font-bold mb-6 text-white">Reports</motion.h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="card-gloss rounded-xl p-6">
          <div className="text-lg font-semibold">Blood Sugar Test</div>
          <div className="text-sm text-gray-200">Patient: Arun Kumar — Date: 15 Aug 2025</div>
          <p className="mt-3 text-gray-100">Fasting sugar slightly high. Follow up recommended.</p>
        </div>
        <div className="card-gloss rounded-xl p-6">
          <div className="text-lg font-semibold">General Health Check</div>
          <div className="text-sm text-gray-200">Patient: Priya Ramesh — Date: 1 Sep 2025</div>
          <p className="mt-3 text-gray-100">All parameters in normal ranges.</p>
        </div>
      </div>
    </div>
  );
}