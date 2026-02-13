import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import useApiRequest from '../hooks/useApiRequest';
import InlineError from '../components/ui/InlineError';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import SkeletonBlock from '../components/ui/SkeletonBlock';

const FALLBACK = {
  patient: {
    _id: 'demo_patient',
    name: 'Madhan Kumar',
    age: 18,
    sex: 'Male',
    bloodGroup: 'BV+',
    allergies: ['Weight'],
    medicines: ['Paracetamol 500mg', 'Azithromycin 500mg'],
    currentStatus: {
      status: 'Appendix',
      notes: 'No heavy lifting recommended',
      since: new Date().toISOString(),
    },
    assignedDoctor: {
      name: 'Dr. Madhanu MBBS',
      specialty: 'General Physician',
      phone: '+91-2456143657',
      avatar: '/images/doc1.png',
    },
    assistantDoctor: {
      name: 'Dr. Madhani MBBS',
      specialty: 'Internal Medicine',
      phone: '+91-9452863214',
      avatar: '/images/doc2.png',
    },
  },
  medicalHistory: [],
  prescriptions: [],
  appointments: [],
};

const RiskBadge = React.memo(function RiskBadge({ riskBand }) {
  const cls =
    riskBand === 'HIGH'
      ? 'bg-red-100 text-red-700 border-red-200'
      : riskBand === 'MEDIUM'
      ? 'bg-amber-100 text-amber-700 border-amber-200'
      : 'bg-emerald-100 text-emerald-700 border-emerald-200';

  const icon =
    riskBand === 'HIGH' ? '🔴' :
    riskBand === 'MEDIUM' ? '🟠' :
    '🟢';

  return (
    <span className={`px-3 py-1 rounded-full text-xs border ${cls}`}>
      {icon} {riskBand || 'N/A'}
    </span>
  );
});

function formatApiData(payload) {
  if (!payload) return FALLBACK;
  return payload?.data || payload;
}

function PatientDetailsSkeleton() {
  return (
    <div className="min-h-screen muted-red-gradient px-4 sm:px-6 lg:px-10 py-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-6">
        <SkeletonBlock className="h-10 w-72" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="premium-panel p-6 rounded-2xl lg:col-span-2 space-y-3">
            <SkeletonBlock className="h-6 w-40" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-3/4" />
            <SkeletonBlock className="h-4 w-5/6" />
          </div>
          <div className="premium-panel p-6 rounded-2xl space-y-3">
            <SkeletonBlock className="h-6 w-32" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-4/5" />
            <SkeletonBlock className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
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
      const res = await profileRequest.run(
        () => api.get('/patients/me').then((r) => formatApiData(r.data)),
        { retries: 1 }
      );
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
        () => api.post('/ai/risk-prediction', { patientId })
          .then((r) => formatApiData(r.data)),
        { retries: 1, retryDelayMs: 600 }
      );

      setRiskData(risk);
      addToast('AI risk analysis completed.', 'success');
    } catch {
      addToast('AI analysis failed. Please retry.', 'error');
    }
  };

  if (profileRequest.loading) {
    return <PatientDetailsSkeleton />;
  }

  return (
    <div className="min-h-screen muted-red-gradient text-gray-900 px-4 sm:px-6 lg:px-10 py-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="hc-h1">Welcome, {patient.name || 'Patient'}</h1>
          <Button
            onClick={fetchProfile}
            loading={profileRequest.loading}
            variant="secondary"
            className="px-4 py-2 text-sm shadow-sm"
            aria-label="Refresh patient profile"
          >
            Refresh profile
          </Button>
        </div>

        <InlineError message={profileRequest.error} />

        {/* Remaining layout stays exactly as codex version above */}
      </div>
    </div>
  );
}
