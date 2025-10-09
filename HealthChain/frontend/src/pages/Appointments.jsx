import React from "react";
import { motion } from "framer-motion";

export default function Appointments() {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Watson",
      date: "2025-09-15",
      time: "10:30 AM",
      type: "General Checkup",
    },
    {
      id: 2,
      doctor: "Dr. Rose",
      date: "2025-09-20",
      time: "3:00 PM",
      type: "Dermatology",
    },
  ];

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-red-700 text-center mb-8"
      >
        Appointments
      </motion.h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-6">
        {appointments.map((appt, index) => (
          <motion.div
            key={appt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="border-b py-4 hover:bg-gray-50"
          >
            <p className="font-bold">{appt.doctor}</p>
            <p>{appt.type}</p>
            <p className="text-gray-500 text-sm">
              {appt.date} at {appt.time}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}