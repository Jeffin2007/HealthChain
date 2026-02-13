import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import SkeletonBlock from '../components/ui/SkeletonBlock';

export default function PatientDashboard({ user }) {
  const [data, setData] = useState(null);

  if (!user) return <Navigate to="/signin" />;

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

  if (!data) {
    return (
      <div className="min-h-screen muted-red-gradient p-10 pt-24">
        <div className="max-w-3xl mx-auto space-y-4">
          <SkeletonBlock className="h-10 w-80" />
          <SkeletonBlock className="h-44 w-full" />
          <SkeletonBlock className="h-44 w-full" />
        </div>
      </div>
    );
  }

  const { patient = {}, prescriptions = [], appointments = [] } = data;

  return (
    <div className="min-h-screen muted-red-gradient text-gray-900 p-6 md:p-10 pt-24">
      <h1 className="hc-h1 mb-6 text-center">Welcome, {patient.name || 'Patient'}</h1>

      <motion.div
        className="premium-panel p-6 rounded-xl max-w-3xl mx-auto mb-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="hc-h2 mb-3 text-hc-700">Patient Info</h2>
        <p><strong>Blood Group:</strong> {patient.bloodGroup || 'N/A'}</p>
        <p><strong>Allergies:</strong> {patient.allergies?.join(', ') || 'None'}</p>
        <p><strong>Current Status:</strong> {patient.currentStatus?.status || 'N/A'}</p>
        <p><strong>Medicines:</strong> {patient.medicines?.length ? patient.medicines.join(', ') : 'No current medicines'}</p>
      </motion.div>

      <motion.div
        className="premium-panel p-6 rounded-xl max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="hc-h2 mb-3 text-hc-700">Assigned Doctor</h2>
        <p>{patient.assignedDoctor?.name || 'N/A'}</p>
        <p>{patient.assignedDoctor?.specialty || 'N/A'}</p>
        <p>{patient.assignedDoctor?.phone || 'N/A'}</p>
      </motion.div>

      <div className="max-w-3xl mx-auto mt-6">
        {!prescriptions.length && !appointments.length && (
          <EmptyState title="No active records" description="Your prescriptions and appointments will appear here once available." />
        )}
      </div>
    </div>
  );
}
