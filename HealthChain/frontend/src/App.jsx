// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard"; // your glossy home
import About from "./pages/About";         // your about page
import SelectRole from "./pages/SelectRole";
import SignIn from "./pages/SignIn";
import PatientDetails from "./pages/PatientDetails";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />

          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Protected-ish page: front-end checks token existence before showing */}
          <Route path="/patient/details" element={<PatientDetails />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
