// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "patient";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Example API (you’ll replace with your backend endpoint)
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
        role,
      });

      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/patient-dashboard"); // ✅ Redirect to patient dashboard
      } else {
        setError("Invalid credentials. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-hc-400 via-hc-600 to-hc-800 text-white">
      <div className="bg-white/10 p-10 rounded-2xl backdrop-blur-xl w-96 shadow-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In as {role}</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-300 text-sm">{error}</p>}
          <button
            type="submit"
            className="btn-primary py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}