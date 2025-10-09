import React from "react";
import { motion } from "framer-motion";

export default function MedicalHistory() {
  const history = [
    { id: 1, condition: "Diabetes", date: "2023-03-10", status: "Ongoing" },
    { id: 2, condition: "Fractured Arm", date: "2022-11-15", status: "Recovered" },
  ];

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-center text-red-700 mb-8"
      >
        Medical History
      </motion.h1>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-6">
        <ul className="space-y-4">
          {history.map((record, index) => (
            <motion.li
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-4 border-b hover:bg-gray-50 rounded-lg"
            >
              <p className="font-semibold">{record.condition}</p>
              <p className="text-gray-500 text-sm">Date: {record.date}</p>
              <p className="text-gray-500 text-sm">Status: {record.status}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}