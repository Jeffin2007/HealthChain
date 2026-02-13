import React from 'react';

function Button({ children, loading, className = '', disabled, ...props }) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`disabled:opacity-60 disabled:cursor-not-allowed transition-all ${className}`}
    >
      {loading ? 'Please wait...' : children}
    </button>
  );
}

export default React.memo(Button);
