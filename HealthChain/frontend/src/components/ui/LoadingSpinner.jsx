import React from 'react';

export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div
      className="flex flex-col items-center gap-3 text-gray-600"
      role="status"
      aria-live="polite"
    >
      <div
        className="w-10 h-10 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-gray-600">{label}</p>
    </div>
  );
}
