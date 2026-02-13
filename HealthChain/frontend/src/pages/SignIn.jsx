import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login as loginRequest } from '../services/authService';
import useApiRequest from '../hooks/useApiRequest';
import useAuth from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import InlineError from '../components/ui/InlineError';
import Button from '../components/ui/Button';

function validate(form) {
  const errors = {};
  if (!form.username.trim()) errors.username = 'Username is required';
  if (!form.password) errors.password = 'Password is required';
  else if (form.password.length < 6) errors.password = 'Password must be at least 6 characters';
  return errors;
}

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = (location.state && location.state.role) || 'Patient';
  const { login } = useAuth();
  const { addToast } = useToast();

  const [form, setForm] = useState({ username: '', password: '', remember: false });
  const [fieldErrors, setFieldErrors] = useState({});
  const { loading, error, setError, run } = useApiRequest();

  const canSubmit = useMemo(() => form.username.trim() && form.password.length >= 6, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const errors = validate(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const payload = await run(() => loginRequest(form.username, form.password), { retries: 1, retryDelayMs: 700 });
      const { user, token } = payload || {};

      if (!token || !user) {
        throw new Error('Invalid login response');
      }

      login({ token, user, remember: form.remember });
      addToast(`Welcome back, ${user.name || user.username}!`, 'success');

      if (user.role === 'patient') navigate('/patient/details');
      else navigate('/');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Login failed';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center muted-red-gradient p-6">
      <div className="premium-panel p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{role} Sign In</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
          <label className="text-sm text-gray-700">
            Username
            <input
              className="mt-1 p-3 rounded border w-full focus:outline-none focus:ring-2 focus:ring-red-200"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
              aria-invalid={Boolean(fieldErrors.username)}
            />
          </label>
          <InlineError message={fieldErrors.username} />

          <label className="text-sm text-gray-700">
            Password
            <input
              className="mt-1 p-3 rounded border w-full focus:outline-none focus:ring-2 focus:ring-red-200"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              aria-invalid={Boolean(fieldErrors.password)}
            />
          </label>
          <InlineError message={fieldErrors.password} />

          <label className="inline-flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm((prev) => ({ ...prev, remember: e.target.checked }))}
            />
            Remember me on this device
          </label>

          <InlineError message={error} />

          <Button
            type="submit"
            loading={loading}
            disabled={!canSubmit}
            className="mt-3 py-2 rounded bg-gradient-to-r from-red-500 to-red-600 text-white"
            aria-label="Sign in"
          >
            Sign In
          </Button>
        </form>

        <p className="text-xs text-gray-500 mt-4">Demo: username <strong>madhan</strong> password <strong>madhan123</strong></p>
      </div>
    </div>
  );
}
