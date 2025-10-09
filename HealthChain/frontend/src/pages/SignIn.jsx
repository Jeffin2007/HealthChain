// frontend/src/pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api"; // axios instance with baseURL

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = (location.state && location.state.role) || "Patient";

  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { username: form.username, password: form.password });
      // Expecting { user, token }
      const { user, token } = res.data;
      if (!token) throw new Error("No token in response");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // navigate based on role
      if (user.role === "patient") navigate("/patient/details");
      else navigate("/");

    } catch (err) {
      console.error("SignIn error:", err);
      const msg = err.response?.data?.error || err.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-red-700 p-6">
      <div className="bg-white/95 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-700 mb-4">{role} Sign In</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input className="p-3 rounded border" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          <input className="p-3 rounded border" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="mt-3 py-2 rounded bg-gradient-to-r from-red-500 to-red-700 text-white">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">Demo: username <strong>madhan</strong> password <strong>madhan123</strong></p>
      </div>
    </div>
  );
}

