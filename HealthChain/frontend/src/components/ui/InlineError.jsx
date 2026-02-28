import React from 'react';

export default function InlineError({ message }) {
  if (!message) return null;

  return (
    <p
      className="mt-1 text-sm font-medium text-red-600"
      role="alert"
      aria-live="assertive"
    >
      <span className="mr-1">⚠</span>
      {message}
    </p>
  );
}
