import React from 'react';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-200 disabled:opacity-60 disabled:cursor-not-allowed';

const variants = {
  primary: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:shadow-md hover:-translate-y-[1px]',
  secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50',
};

function Button({ children, loading, className = '', disabled, variant = 'primary', ...props }) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
    >
      {loading ? 'Please wait...' : children}
    </button>
  );
}

export default React.memo(Button);
