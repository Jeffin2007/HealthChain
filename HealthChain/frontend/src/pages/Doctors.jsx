import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import dummyData from '../utils/dummyData';

function StatCard({ label, value, hint }) {
  return (
    <div className="premium-panel rounded-xl p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
      {hint ? <p className="text-xs text-gray-500 mt-1">{hint}</p> : null}
    </div>
  );
}

export default function Doctors() {
  const doctor = dummyData.doctors[0];
  const patients = dummyData.patients;

  const metrics = useMemo(() => {
    const totalPatients = patients.length;
    const highAttentionPatients = patients.filter((p) =>
      ['fever', 'appendix', 'critical', 'urgent'].some((k) =>
        `${p.currentStatus?.status || ''}`.toLowerCase().includes(k)
      )
    ).length;
    const pendingPharmacy = patients.reduce(
      (count, p) =>
        count + (p.prescriptions?.filter((pres) => pres.pharmacyStatus).length || 0),
      0
    );
    const allergiesTracked = patients.filter(
      (p) => (p.allergies || []).length > 0
    ).length;

    return {
      totalPatients,
      highAttentionPatients,
      pendingPharmacy,
      allergiesTracked,
    };
  }, [patients]);

  return (
    <div className="min-h-screen muted-red-gradient p-6 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.h1
          className="hc-h1 text-hc-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Doctor Command Center
        </motion.h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            label="Assigned Patients"
            value={metrics.totalPatients}
            hint="Current caseload"
          />
          <StatCard
            label="Needs Attention"
            value={metrics.highAttentionPatients}
            hint="Status flagged by condition"
          />
          <StatCard
            label="Pharmacy Follow-ups"
            value={metrics.pendingPharmacy}
            hint="Prescription handoffs"
          />
          <StatCard
            label="Allergy Alerts"
            value={metrics.allergiesTracked}
            hint="Patients with allergy records"
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.section
            whileHover={{ scale: 1.005 }}
            className="premium-panel rounded-xl p-6 lg:col-span-1"
          >
            <div className="flex items-center gap-4">
              <img
                src={doctor.avatar}
                alt="Doctor"
                className="w-20 h-20 rounded-full border-2 border-red-200 object-cover"
              />
              <div>
                <h2 className="hc-h2 text-gray-800">{doctor.name}</h2>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <p className="text-sm text-gray-500">
                  Experience: {doctor.experienceYears} years
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Contact: {doctor.contact}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-white border border-gray-100 p-3">
                <p className="text-gray-500 text-xs">Today&apos;s Rounds</p>
                <p className="font-semibold text-gray-800">
                  {Math.max(metrics.totalPatients, 3)}
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-100 p-3">
                <p className="text-gray-500 text-xs">Follow-ups</p>
                <p className="font-semibold text-gray-800">
                  {Math.max(metrics.pendingPharmacy, 1)}
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            whileHover={{ scale: 1.005 }}
            className="premium-panel rounded-xl p-6 lg:col-span-2"
          >
            <h2 className="hc-h2 text-gray-800 mb-4">
              Patient Monitoring Board
            </h2>
            <div className="space-y-3">
              {patients.map((patient) => (
                <motion.div
                  key={patient.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={patient.avatar}
                      alt={`${patient.name} profile`}
                      className="w-14 h-14 rounded-full border-2 border-red-100 object-cover"
                    />
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {patient.age} yrs • {patient.sex} • Blood:{' '}
                        {patient.bloodGroup}
                      </p>
                      <p className="text-xs text-gray-500">
                        Allergies:{' '}
                        {patient.allergies?.length
                          ? patient.allergies.join(', ')
                          : 'None'}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm md:text-right">
                    <p className="font-medium text-red-700">
                      Status:{' '}
                      {patient.currentStatus?.status || 'Stable'}
                    </p>
                    <p className="text-gray-500">
                      {patient.currentStatus?.notes ||
                        'No active clinical note'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Last Appointment:{' '}
                      {patient.appointmentHistory?.[0]?.date || 'N/A'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}