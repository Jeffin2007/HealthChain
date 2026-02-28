import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

function ToastItem({ toast, onClose }) {
  const tone = toast.type === 'error' ? 'bg-red-600' : toast.type === 'warning' ? 'bg-amber-500' : 'bg-emerald-600';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${tone} text-white px-4 py-3 rounded-lg shadow-lg text-sm flex items-center justify-between gap-4 min-w-[240px]`}
    >
      <span>{toast.message}</span>
      <button onClick={() => onClose(toast.id)} className="text-white/90 hover:text-white" aria-label="Close notification">✕</button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'success', timeout = 3200) => {
    const id = `${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => removeToast(id), timeout);
  }, [removeToast]);

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] space-y-2">
        {toasts.map((toast) => <ToastItem key={toast.id} toast={toast} onClose={removeToast} />)}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
