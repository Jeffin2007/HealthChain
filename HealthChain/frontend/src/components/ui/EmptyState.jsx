import React from 'react';

export default function EmptyState({ title = 'No data available', description = 'Please check back later.' }) {
  return (
    <div className="rounded-xl bg-gray-50 border border-gray-200 p-6 text-center text-gray-700">
      <div className="text-2xl mb-2" aria-hidden="true">🗂️</div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm mt-1 text-gray-500">{description}</p>
    </div>
  );
}
