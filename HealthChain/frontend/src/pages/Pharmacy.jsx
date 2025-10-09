import React from "react";
import { motion } from "framer-motion";

export default function Pharmacy() {
  const pharmacies = [
    {
      id: 1,
      name: "City Pharmacy",
      location: "Downtown Street, Trichy",
      contact: "98765 43210",
    },
    {
      id: 2,
      name: "HealthPlus",
      location: "Anna Nagar, Trichy",
      contact: "91234 56789",
    },
  ];

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-center text-red-700 mb-8"
      >
        Pharmacy Directory
      </motion.h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {pharmacies.map((pharma, index) => (
          <motion.div
            key={pharma.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl"
          >
            <h2 className="text-xl font-bold text-red-700">{pharma.name}</h2>
            <p className="text-gray-600">{pharma.location}</p>
            <p className="text-gray-500">Contact: {pharma.contact}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}