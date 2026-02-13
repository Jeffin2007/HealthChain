import React from 'react';

export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center gap-3 text-white" role="status" aria-live="polite">
      <div className="w-10 h-10 border-4 border-white/40 border-t-white rounded-full animate-spin" />
      <p className="text-sm text-white/90">{label}</p>
    </div>
  );
}
