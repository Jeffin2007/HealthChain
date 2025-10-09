import React from "react";
import { motion } from "framer-motion";
import { User, Stethoscope, HeartPulse, Calendar } from "lucide-react";

export default function Doctors({ role }) {
  const doctor = dummyData.doctors[0]; // Static for now
  const patients = dummyData.patients; // Assigned patients list

  return (
    <div className="min-h-screen bg-animated-gradient p-8">
      <motion.h1
        className="text-4xl font-bold text-white text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Dr. {doctor.name}'s Dashboard
      </motion.h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Doctor Profile */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-xl shadow-xl p-6"
        >
          <div className="flex items-center gap-4">
            <img
              src={doctor.photo}
              alt="Doctor"
              className="w-20 h-20 rounded-full border-4 border-red-500"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
              <p className="text-gray-600">Experience: {doctor.experience} years</p>
              <p className="text-gray-600">{doctor.specialization}</p>
            </div>
          </div>
        </motion.div>

        {/* Assigned Patients */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-xl shadow-xl p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Assigned Patients</h2>
          <div className="space-y-4">
            {patients.map((patient) => (
              <motion.div
                key={patient.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <img
                  src={patient.photo}
                  alt="Patient"
                  className="w-14 h-14 rounded-full border-2 border-red-400"
                />
                <div>
                  <h3 className="text-lg font-semibold">{patient.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {patient.age} yrs • {patient.gender} • Blood: {patient.bloodGroup}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Last Appointment: {patient.lastAppointment}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}