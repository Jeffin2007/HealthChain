import React from 'react';

export default function InlineError({ message }) {
  if (!message) return null;
  return <p className="text-sm text-red-600 mt-1" role="alert">⚠ {message}</p>;
}
