import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import useApiRequest from '../hooks/useApiRequest';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import InlineError from '../components/ui/InlineError';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';

const FALLBACK = {
  patient: {
    _id: 'demo_patient',
    name: 'Madhan Kumar',
    age: 18,
    sex: 'Male',
    bloodGroup: 'BV+',
    allergies: ['Weight'],
    medicines: ['Paracetamol 500mg', 'Azithromycin 500mg'],
    currentStatus: { status: 'Appendix', notes: 'No heavy lifting recommended', since: new Date().toISOString() },
    assignedDoctor: { name: 'Dr. Madhanu MBBS', specialty: 'General Physician', phone: '+91-2456143657', avatar: '/images/doc1.png' },
    assistantDoctor: { name: 'Dr. Madhani MBBS', specialty: 'Internal Medicine', phone: '+91-9452863214', avatar: '/images/doc2.png' },
  },
  medicalHistory: [],
  prescriptions: [],
  appointments: [],
};

const RiskBadge = React.memo(function RiskBadge({ riskBand }) {
  const cls = riskBand === 'HIGH' ? 'bg-red-500/20 text-red-200 border-red-300/40' : riskBand === 'MEDIUM' ? 'bg-amber-500/20 text-amber-100 border-amber-300/40' : 'bg-emerald-500/20 text-emerald-100 border-emerald-300/40';
  return <span className={`px-3 py-1 rounded-full text-xs border ${cls}`}>{riskBand || 'N/A'}</span>;
});

function formatApiData(payload) {
  if (!payload) return FALLBACK;
  return payload?.data || payload;
}

export default function PatientDetails() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const profileRequest = useApiRequest();
  const riskRequest = useApiRequest();

  const [data, setData] = useState(FALLBACK);
  const [riskData, setRiskData] = useState(null);

  const patient = useMemo(() => data?.patient || {}, [data]);
  const prescriptions = useMemo(() => data?.prescriptions || [], [data]);
  const appointments = useMemo(() => data?.appointments || [], [data]);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await profileRequest.run(() => api.get('/patients/me').then((r) => formatApiData(r.data)), { retries: 1 });
      setData(res || FALLBACK);
    } catch {
      setData(FALLBACK);
      addToast('Using demo patient data due to API issue.', 'warning');
    }
  }, [addToast, profileRequest]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const loadRiskPrediction = async () => {
    try {
      const patientId = patient._id || user?._id;
      if (!patientId) {
        addToast('Patient ID unavailable for prediction.', 'error');
        return;
      }

      const risk = await riskRequest.run(
        () => api.post('/ai/risk-prediction', { patientId }).then((r) => formatApiData(r.data)),
        { retries: 1, retryDelayMs: 600 }
      );
      setRiskData(risk);
      addToast('AI risk analysis completed.', 'success');
    } catch {
      addToast('AI analysis failed. Please retry.', 'error');
    }
  };

  if (profileRequest.loading) {
    return <div className="min-h-screen flex items-center justify-center muted-red-gradient"><LoadingSpinner label="Loading patient details..." /></div>;
  }

  return (
    <div className="min-h-screen muted-red-gradient text-gray-900 px-4 sm:px-6 lg:px-10 py-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Welcome, {patient.name || 'Patient'}</h1>
          <Button onClick={fetchProfile} loading={profileRequest.loading} className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm shadow-sm">
            Refresh profile
          </Button>
        </div>

        <InlineError message={profileRequest.error} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 premium-panel p-6 rounded-2xl text-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-hc-700">Patient Bio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
              <p><strong>Blood Group:</strong> {patient.bloodGroup || 'N/A'}</p>
              <p><strong>Current Status:</strong> {patient.currentStatus?.status || 'N/A'}</p>
              <p className="sm:col-span-2"><strong>Allergies:</strong> {patient.allergies?.length ? patient.allergies.join(', ') : 'None'}</p>
              <p className="sm:col-span-2"><strong>Medicines:</strong> {patient.medicines?.length ? patient.medicines.join(', ') : 'No current medicines'}</p>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-panel p-6 rounded-2xl text-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-hc-700">AI Risk Insight</h2>
              <span className="text-xs text-gray-500" title="Risk score is generated by a demo explainable rule-based model.">ⓘ</span>
            </div>

            {riskData ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Risk score</p>
                  <p className="text-2xl font-bold">{Math.round((riskData.riskScore || 0) * 100)}%</p>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden" aria-label="Risk score indicator">
                  <div className="h-full bg-gradient-to-r from-red-400 to-red-600" style={{ width: `${Math.round((riskData.riskScore || 0) * 100)}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Risk band</p>
                  <RiskBadge riskBand={riskData.riskBand} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Contributing factors</p>
                  {riskData.factors?.length ? (
                    <ul className="space-y-1 text-sm">
                      {riskData.factors.map((f) => (
                        <li key={f.factor} className="flex justify-between border-b border-gray-100 py-1">
                          <span className="capitalize">{String(f.factor).replace(/_/g, ' ')}</span>
                          <span>{Math.round((f.impact || 0) * 100)}%</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No major factors identified.</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-3">Run AI analysis to generate patient risk summary.</p>
            )}

            <InlineError message={riskRequest.error} />
            <Button
              onClick={loadRiskPrediction}
              loading={riskRequest.loading}
              className="w-full mt-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white"
              aria-label="Run AI risk prediction"
            >
              Run AI Prediction
            </Button>
          </motion.section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="premium-panel p-6 rounded-2xl text-gray-800">
            <h2 className="text-xl font-semibold mb-3 text-hc-700">Prescriptions</h2>
            {prescriptions.length ? (
              <div className="overflow-auto">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="py-2">Doctor</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((pres) => (
                      <tr key={pres._id} className="border-b border-gray-100">
                        <td className="py-2">{pres.doctor?.name || 'N/A'}</td>
                        <td className="py-2 capitalize">{pres.pharmacyStatus || 'pending'}</td>
                        <td className="py-2">{pres.createdAt ? format(new Date(pres.createdAt), 'dd MMM yyyy') : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState title="No prescriptions yet" description="Once your doctor issues prescriptions, they will appear here." />
            )}
          </section>

          <section className="premium-panel p-6 rounded-2xl text-gray-800">
            <h2 className="text-xl font-semibold mb-3 text-hc-700">Appointments</h2>
            {appointments.length ? (
              <ul className="space-y-2 text-sm">
                {appointments.map((appt) => (
                  <li key={appt._id} className="p-3 rounded-lg bg-white border border-gray-100 flex items-center justify-between shadow-sm">
                    <span>{appt.doctor?.name || 'Doctor'} - {appt.status || 'scheduled'}</span>
                    <span>{appt.date ? format(new Date(appt.date), 'dd MMM, hh:mm a') : '-'}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="No appointments scheduled" description="Book your next consultation to see it here." />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
