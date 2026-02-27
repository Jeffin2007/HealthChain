import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ProtectedRoute from './components/auth/ProtectedRoute';
import useAuth from './hooks/useAuth';
import { useToast } from './context/ToastContext';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const About = lazy(() => import('./pages/About'));
const SelectRole = lazy(() => import('./pages/SelectRole'));
const SignIn = lazy(() => import('./pages/SignIn'));
const PatientDetails = lazy(() => import('./pages/PatientDetails'));

function AppRoutes() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    const onUnauthorized = () => {
      logout();
      addToast('Session expired. Please sign in again.', 'warning');
      navigate('/signin', { replace: true });
    };

    window.addEventListener('hc:unauthorized', onUnauthorized);
    return () => window.removeEventListener('hc:unauthorized', onUnauthorized);
  }, [addToast, logout, navigate]);

  return (
    <>
      <Navbar />
      <div className="pt-4">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-red-700"><LoadingSpinner /></div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/select-role" element={<SelectRole />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/patient/details"
              element={(
                <ProtectedRoute>
                  <PatientDetails />
                </ProtectedRoute>
              )}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
