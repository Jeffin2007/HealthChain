import React from 'react';

export default function InlineError({ message }) {
  if (!message) return null;
  return <p className="text-sm text-red-200" role="alert">{message}</p>;
}
