import React from 'react';
import { motion } from 'framer-motion';
import dummyData from '../utils/dummyData';

export default function Doctors() {
  const doctor = dummyData.doctors[0];
  const patients = dummyData.patients;

  return (
    <div className="min-h-screen muted-red-gradient p-6 md:p-8 pt-24">
      <motion.h1
        className="hc-h1 text-hc-700 text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Dr. {doctor.name}'s Dashboard
      </motion.h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.01 }} className="premium-panel rounded-xl p-6">
          <div className="flex items-center gap-4">
            <img src={doctor.avatar} alt="Doctor" className="w-20 h-20 rounded-full border-2 border-red-200 object-cover" />
            <div>
              <h2 className="hc-h2 text-gray-800">{doctor.name}</h2>
              <p className="hc-body">Experience: {doctor.experienceYears} years</p>
              <p className="text-sm text-gray-500">{doctor.specialty}</p>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.01 }} className="premium-panel rounded-xl p-6">
          <h2 className="hc-h2 text-gray-800 mb-4">Assigned Patients</h2>
          <div className="space-y-3">
            {patients.map((patient) => (
              <motion.div key={patient.id} whileHover={{ scale: 1.01 }} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <img src={patient.avatar} alt="Patient" className="w-14 h-14 rounded-full border-2 border-red-100 object-cover" />
                <div>
                  <h3 className="text-base font-semibold text-gray-800">{patient.name}</h3>
                  <p className="text-sm text-gray-600">
                    {patient.age} yrs • {patient.sex} • Blood: {patient.bloodGroup}
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
