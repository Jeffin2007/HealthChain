import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate, Link } from 'react-router-dom';
import api from '../api/axios';
import EmptyState from '../components/ui/EmptyState';
import SkeletonBlock from '../components/ui/SkeletonBlock';
import useAuth from '../hooks/useAuth';


function profileFallback(name = 'Patient') {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fde8e8&color=991b1b&size=128`;
}

function StatCard({ label, value, helper }) {
  return (
    <div className="premium-panel p-4 rounded-xl">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
      {helper ? <p className="text-xs text-gray-500 mt-1">{helper}</p> : null}
    </div>
  );
}

export default function PatientDashboard() {
  const [data, setData] = useState(null);
  const { user } = useAuth();

  if (!user) return <Navigate to="/signin" replace />;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/patients/me');
        setData(res.data?.data || res.data);
      } catch (err) {
        console.error('Error fetching patient data:', err);
        setData({ patient: {}, prescriptions: [], appointments: [] });
      }
    }
    fetchData();
  }, []);

  const { patient = {}, prescriptions = [], appointments = [] } = data || {};

  const upcomingAppointments = useMemo(
    () => appointments.filter((appt) => appt.date && new Date(appt.date) >= new Date()),
    [appointments]
  );

  if (!data) {
    return (
      <div className="min-h-screen muted-red-gradient p-6 md:p-10 pt-24">
        <div className="max-w-6xl mx-auto space-y-4">
          <SkeletonBlock className="h-10 w-80" />
          <div className="grid md:grid-cols-4 gap-4">
            <SkeletonBlock className="h-24 w-full" />
            <SkeletonBlock className="h-24 w-full" />
            <SkeletonBlock className="h-24 w-full" />
            <SkeletonBlock className="h-24 w-full" />
          </div>
          <SkeletonBlock className="h-44 w-full" />
          <SkeletonBlock className="h-44 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen muted-red-gradient text-gray-900 p-6 md:p-10 pt-24">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="hc-h1 mb-1">Welcome, {patient.name || 'Patient'}</h1>
            <p className="text-sm md:text-base text-gray-600">
              Track your care journey, prescriptions, appointments, and safety information in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/patient/details" className="btn-gloss px-4 py-2 rounded-lg text-white text-sm font-semibold">
              Open Full Record
            </Link>
            <Link to="/doctors" className="px-4 py-2 rounded-lg text-sm font-semibold border border-red-200 text-red-700 hover:bg-red-50 transition-colors">
              Contact Care Team
            </Link>
          </div>
        </div>

        <section className="premium-panel rounded-xl p-4 md:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <img
              src={patient.avatar || profileFallback(patient.name)}
              alt={`${patient.name || 'Patient'} profile`}
              className="w-20 h-20 rounded-full object-cover border-2 border-red-100"
            />
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-500">Patient Profile</p>
              <p className="text-lg font-semibold text-gray-800">{patient.name || 'Unknown Patient'}</p>
              <p className="text-sm text-gray-600">{patient.email || 'No email on file'}</p>
              <p className="text-sm text-gray-600">{patient.phone || 'No phone on file'}</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Prescriptions" value={prescriptions.length} helper="Active and historical" />
          <StatCard label="Appointments" value={appointments.length} helper={`${upcomingAppointments.length} upcoming`} />
          <StatCard label="Allergies" value={patient.allergies?.length || 0} helper="Safety critical" />
          <StatCard label="Current medicines" value={patient.medicines?.length || 0} helper="Medication adherence" />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.section
            className="lg:col-span-2 premium-panel p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="hc-h2 mb-4 text-hc-700">Clinical Snapshot</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
              <p><strong>Blood Group:</strong> {patient.bloodGroup || 'N/A'}</p>
              <p><strong>Sex:</strong> {patient.sex || 'N/A'}</p>
              <p><strong>Age:</strong> {patient.age || 'N/A'}</p>
              <p><strong>Current Status:</strong> {patient.currentStatus?.status || 'N/A'}</p>
              <p className="md:col-span-2"><strong>Status Notes:</strong> {patient.currentStatus?.notes || 'No notes available'}</p>
              <p className="md:col-span-2"><strong>Allergies:</strong> {patient.allergies?.length ? patient.allergies.join(', ') : 'None reported'}</p>
              <p className="md:col-span-2"><strong>Current Medicines:</strong> {patient.medicines?.length ? patient.medicines.join(', ') : 'No active medicines'}</p>
            </div>
          </motion.section>

          <motion.section
            className="premium-panel p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <h2 className="hc-h2 mb-4 text-hc-700">Care Team</h2>
            <div className="space-y-3 text-sm md:text-base">
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <p className="text-xs uppercase tracking-wide text-gray-500">Primary Doctor</p>
                <p className="font-semibold text-gray-800">{patient.assignedDoctor?.name || 'Not assigned'}</p>
                <p className="text-gray-600">{patient.assignedDoctor?.specialty || '—'}</p>
                <p className="text-gray-600">{patient.assignedDoctor?.phone || '—'}</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <p className="text-xs uppercase tracking-wide text-gray-500">Assistant Doctor</p>
                <p className="font-semibold text-gray-800">{patient.assistantDoctor?.name || 'Not assigned'}</p>
                <p className="text-gray-600">{patient.assistantDoctor?.specialty || '—'}</p>
                <p className="text-gray-600">{patient.assistantDoctor?.phone || '—'}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                <p className="text-xs uppercase tracking-wide text-red-500">Emergency Contact</p>
                <p className="font-semibold text-red-700">{patient.emergencyContact?.name || 'Not provided'}</p>
                <p className="text-red-700">{patient.emergencyContact?.relation || '—'}</p>
                <p className="text-red-700">{patient.emergencyContact?.phone || '—'}</p>
              </div>
            </div>
          </motion.section>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <section className="premium-panel p-6 rounded-xl">
            <h2 className="hc-h2 mb-4 text-hc-700">Appointments Timeline</h2>
            {appointments.length ? (
              <ul className="space-y-2">
                {appointments.map((appt) => (
                  <li key={appt._id} className="p-3 rounded-lg bg-white border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm">
                    <span className="font-medium text-gray-800">{appt.doctor?.name || 'Doctor'} • {appt.reason || 'Consultation'}</span>
                    <span className="text-gray-500">{appt.date ? new Date(appt.date).toLocaleString() : 'Date TBD'} • {appt.status || 'scheduled'}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="No appointments yet" description="Your consultations will show up here once scheduled." />
            )}
          </section>

          <section className="premium-panel p-6 rounded-xl">
            <h2 className="hc-h2 mb-4 text-hc-700">Prescription Summary</h2>
            {prescriptions.length ? (
              <ul className="space-y-2">
                {prescriptions.map((pres) => (
                  <li key={pres._id} className="p-3 rounded-lg bg-white border border-gray-100 flex items-center justify-between gap-3 text-sm">
                    <div>
                      <p className="font-medium text-gray-800">{pres.doctor?.name || 'Prescribing doctor'}</p>
                      <p className="text-gray-500">{pres.notes || 'No notes provided'}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-700 capitalize border border-red-100">
                      {pres.pharmacyStatus || 'pending'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="No prescriptions yet" description="Prescriptions issued by your doctors will appear here." />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
