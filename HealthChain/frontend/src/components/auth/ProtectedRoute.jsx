import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, authReady } = useAuthContext();
  const location = useLocation();

  if (!authReady) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner label="Checking session..." /></div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }

  return children;
}
