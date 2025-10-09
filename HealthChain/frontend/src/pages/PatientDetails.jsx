// frontend/src/pages/PatientDetails.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { format } from "date-fns";

/**
 * PatientDetails (updated)
 * - Location: frontend/src/pages/PatientDetails.jsx
 * - Changes: removed Message/Download, added Call Doctor, Patient Bio menu (Overview / Full Bio)
 * - Softer background (not heavy red)
 */

const FALLBACK = {
  patient: {
    name: "Madhan Kumar",
    age: 18,
    sex: "Male",
    bloodGroup: "BV+",
    allergies: ["Weight"],
    emergencyContact: { name: "S. Kumar", relation: "Father", phone: "+91-7254832152" },
    avatar: "/images/madhan.jpg",
    medicines: ["Paracetamol 500mg", "Azithromycin 500mg"],
    currentStatus: { status: "Appendix", notes: "Net inside Stomach.No Heavy Lifting is recommended", since: new Date().toISOString() },
    assignedDoctor: { name: "Dr.Madhanu MBBS", specialty: "General Physician", phone: "+91-2456143657", avatar: "/images/doc1.png" },
    assistantDoctor: { name: "Dr.Madhani MBBS", specialty: "Internal Medicine", phone: "+91-9452863214", avatar: "/images/doc2.png"  },
    email: "namakkalmadhan128@gmail.com",
    phone: "+91-9876543210",
    address: "No-128 Kongunadu ,Nammakal,Trichy Village",
    insurance: { provider: "Aegis Health", policy: "AG-123456" }
  },
  medicalHistory: [
    { _id: "h1", date: new Date().toISOString(), condition: "Seasonal flu", notes: "Rest & antivirals" },
    { _id: "h2", date: new Date("2023-02-20").toISOString(), condition: "Fractured wrist", notes: "Cast applied - healed" }
  ],
  prescriptions: [
    {
      _id: "p1",
      createdAt: new Date().toISOString(),
      meds: [
        { name: "Paracetamol", dosage: "500mg", frequency: "3x/day", duration: "5 days" },
        { name: "Azithromycin", dosage: "500mg", frequency: "Once daily", duration: "3 days" }
      ],
      notes: "No heavy lifting and Dancing",
      pharmacyStatus: "Out for delivery",
      deliveryETA: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
      doctor: { name: "Dr.Madhanu MBBS", avatar: "/images/doc1.png" }
    }
  ],
  appointments: []
};

function Tag({ children }) {
  return <span className="inline-block px-3 py-1 rounded-full text-xs bg-slate-100 text-slate-800">{children}</span>;
}

export default function PatientDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview"); // overview | fullbio

  useEffect(() => {
    let mounted = true;
    async function fetchProfile() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/patients/me");
        if (!mounted) return;
        setData(res.data);
      } catch (err) {
        console.error("PatientDetails fetch err:", err);
        setError(".");
        setData(FALLBACK);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProfile();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
          className="w-14 h-14 rounded-full border-4 border-slate-200 flex items-center justify-center"
        >
          <div className="w-6 h-6 rounded-full bg-indigo-400" />
        </motion.div>
      </div>
    );
  }

  const { patient, medicalHistory = [], prescriptions = [] } = data || FALLBACK;
  const since = patient?.currentStatus?.since ? format(new Date(patient.currentStatus.since), "dd MMM yyyy") : "N/A";

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Bio & quick actions */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-3 bg-white shadow-sm p-6 rounded-2xl border"
        >
          <div className="flex items-center gap-4">
            <img src={patient.avatar} alt={patient.name} className="w-20 h-20 rounded-full object-cover border-2 border-slate-100 shadow-sm" />
            <div>
              <h2 className="text-2xl font-semibold">{patient.name}</h2>
              <p className="text-sm text-slate-500">{patient.email}</p>
              <p className="text-sm text-slate-500">{patient.phone}</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex gap-2 items-center">
              <Tag>{patient.age ?? "-" } yrs</Tag>
              <Tag>{patient.sex || "-"}</Tag>
              <Tag>Blood: {patient.bloodGroup || "-"}</Tag>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-700 mt-2">Current Status</h3>
              <p className="text-sm text-slate-600 mt-1">{patient.currentStatus?.status || "Healthy"}</p>
              <p className="text-xs text-slate-500 mt-1">{patient.currentStatus?.notes || ""}</p>
              <p className="text-xs text-slate-400 mt-1">Since: {since}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-700 mt-3">Allergies</h3>
              <p className="text-sm text-slate-600 mt-1">{(patient.allergies && patient.allergies.join(", ")) || "None"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-700 mt-3">Emergency Contact</h3>
              <p className="text-sm text-slate-600 mt-1">{patient.emergencyContact?.name} ({patient.emergencyContact?.relation})</p>
              <p className="text-xs text-slate-500">{patient.emergencyContact?.phone}</p>
            </div>

            {/* Quick actions: only Call Doctor retained */}
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={`tel:${patient.assignedDoctor?.phone || patient.phone || "#"}`}
                className="block text-center py-2 rounded-lg bg-indigo-600 text-white font-medium hover:shadow-md transition"
              >
                Call Primary Doctor
              </a>
              <a
                href={`tel:${patient.assistantDoctor?.phone || patient.phone || "#"}`}
                className="block text-center py-2 rounded-lg bg-indigo-100 text-indigo-700 border hover:bg-indigo-200 transition"
              >
                Call Assistant Doctor
              </a>
            </div>
          </div>
        </motion.aside>

        {/* CENTER: Medical history & prescriptions + Bio menu */}
        <main className="lg:col-span-6 space-y-6">
          {/* Bio Tab Menu */}
          <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white shadow-sm p-6 rounded-2xl border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Patient Profile</h3>
                <p className="text-sm text-slate-500">Overview of personal & medical information</p>
              </div>

              <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-full">
                <button onClick={() => setActiveTab("overview")} className={`px-3 py-1 rounded-full text-sm ${activeTab === "overview" ? "bg-indigo-600 text-white" : "text-slate-600"}`}>Overview</button>
                <button onClick={() => setActiveTab("fullbio")} className={`px-3 py-1 rounded-full text-sm ${activeTab === "fullbio" ? "bg-indigo-600 text-white" : "text-slate-600"}`}>Full Bio</button>
              </div>
            </div>

            {activeTab === "overview" ? (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-700">Basic Info</h4>
                  <p className="text-slate-600 mt-1">Age: {patient.age ?? "-"}</p>
                  <p className="text-slate-600">Sex: {patient.sex ?? "-"}</p>
                  <p className="text-slate-600">Blood Group: {patient.bloodGroup ?? "-"}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-700">Contact</h4>
                  <p className="text-slate-600 mt-1">Email: {patient.email || "-"}</p>
                  <p className="text-slate-600">Phone: {patient.phone || "-"}</p>
                  <p className="text-slate-600">Address: {patient.address || "-"}</p>
                </div>

                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-slate-700 mt-2">Medicines</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {patient.medicines && patient.medicines.length > 0 ? patient.medicines.map((m, i) => <Tag key={i}>{m}</Tag>) : <p className="text-slate-500">No current medicines</p>}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <h4 className="text-sm font-medium text-slate-700">Full Bio / Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-600"><strong>Full Name:</strong> {patient.name}</p>
                    <p className="text-slate-600"><strong>Age:</strong> {patient.age}</p>
                    <p className="text-slate-600"><strong>Sex:</strong> {patient.sex}</p>
                    <p className="text-slate-600"><strong>Blood Group:</strong> {patient.bloodGroup}</p>
                    <p className="text-slate-600"><strong>Allergies:</strong> {(patient.allergies && patient.allergies.join(", ")) || "None"}</p>
                  </div>
                  <div>
                    <p className="text-slate-600"><strong>Phone:</strong> {patient.phone}</p>
                    <p className="text-slate-600"><strong>Email:</strong> {patient.email}</p>
                    <p className="text-slate-600"><strong>Address:</strong> {patient.address || "-"}</p>
                    <p className="text-slate-600"><strong>Insurance:</strong> {patient.insurance?.provider ? `${patient.insurance.provider} • ${patient.insurance.policy}` : "-"}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-medium text-slate-700">Emergency Contact</h4>
                  <p className="text-slate-600">{patient.emergencyContact?.name} ({patient.emergencyContact?.relation}) — {patient.emergencyContact?.phone}</p>
                </div>
              </div>
            )}
          </motion.section>

          {/* Medical History */}
          <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white shadow-sm p-6 rounded-2xl border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Medical History</h3>
              <span className="text-sm text-slate-500">{medicalHistory.length} records</span>
            </div>

            <div className="mt-4 space-y-3">
              {medicalHistory.length === 0 ? (
                <p className="text-slate-500">No medical history recorded.</p>
              ) : (
                medicalHistory.map((h) => (
                  <div key={h._id} className="p-3 rounded-lg bg-slate-50 border">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium text-slate-700">{h.condition}</div>
                        <div className="text-sm text-slate-600 mt-1">{h.notes}</div>
                      </div>
                      <div className="text-xs text-slate-500">{h.date ? format(new Date(h.date), "dd MMM yyyy") : ""}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.section>

          {/* Prescriptions */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white shadow-sm p-6 rounded-2xl border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Latest Prescriptions</h3>
              <span className="text-sm text-slate-500">{prescriptions.length}</span>
            </div>

            <div className="mt-4 space-y-4">
              {prescriptions.length === 0 ? (
                <p className="text-slate-500">No prescriptions yet.</p>
              ) : (
                prescriptions.map((pres) => (
                  <div key={pres._id} className="p-3 rounded-lg bg-slate-50 border">
                    <div className="flex items-start gap-3">
                      <img src={pres.doctor?.avatar || "/images/placeholder-avatar.png"} alt={pres.doctor?.name} className="w-12 h-12 rounded-full object-cover border" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-slate-700">{pres.doctor?.name || "Doctor"}</div>
                            <div className="text-sm text-slate-600">{pres.notes}</div>
                          </div>
                          <div className="text-xs text-slate-500">{pres.createdAt ? format(new Date(pres.createdAt), "dd MMM yyyy") : ""}</div>
                        </div>

                        <ul className="mt-2 text-sm text-slate-700 ml-1 list-disc">
                          {pres.meds?.map((m, i) => (
                            <li key={i}>{m.name} — {m.dosage} · {m.frequency} · {m.duration}</li>
                          ))}
                        </ul>

                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">{pres.pharmacyStatus || "pending"}</span>
                          {pres.deliveryETA && <span className="text-xs text-slate-500">ETA: {format(new Date(pres.deliveryETA), "HH:mm, dd MMM")}</span>}
                          <button className="ml-auto text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg hover:opacity-95 transition">Request Refill</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.section>
        </main>

        {/* RIGHT: Sticky Doctor cards */}
        <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="lg:col-span-3">
          <div className="sticky top-24 space-y-4">
            {/* Primary doctor */}
            <div className="bg-white shadow-sm p-4 rounded-2xl border">
              <div className="flex items-center gap-3">
                <img src={patient.assignedDoctor?.avatar || "/images/placeholder-avatar.png"} alt={patient.assignedDoctor?.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <div className="text-lg font-semibold">{patient.assignedDoctor?.name || "Primary Doctor"}</div>
                  <div className="text-sm text-slate-500">{patient.assignedDoctor?.specialty || ""}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <a href={`tel:${patient.assignedDoctor?.phone || "#"}`} className="flex-1 text-center py-2 rounded-lg bg-indigo-600 text-white">Call</a>
                <a href={`mailto:${patient.assignedDoctor?.email || ""}`} className="flex-1 text-center py-2 rounded-lg bg-slate-50 text-slate-700 border">Email</a>
              </div>
            </div>

            {/* Assistant doctor */}
            <div className="bg-white shadow-sm p-4 rounded-2xl border">
              <div className="flex items-center gap-3">
                <img src={patient.assistantDoctor?.avatar || "/images/placeholder-avatar.png"} alt={patient.assistantDoctor?.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <div className="text-lg font-semibold">{patient.assistantDoctor?.name || "Assistant Doctor"}</div>
                  <div className="text-sm text-slate-500">{patient.assistantDoctor?.specialty || ""}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <a href={`tel:${patient.assistantDoctor?.phone || "#"}`} className="flex-1 text-center py-2 rounded-lg bg-indigo-600 text-white">Call</a>
                <a href={`mailto:${patient.assistantDoctor?.email || ""}`} className="flex-1 text-center py-2 rounded-lg bg-slate-50 text-slate-700 border">Email</a>
              </div>
            </div>

            {/* Small stats */}
            <div className="bg-white shadow-sm p-4 rounded-2xl border text-center">
              <div className="text-sm text-slate-500">Platform Stats</div>
              <div className="mt-2 text-2xl font-bold">1,000+</div>
              <div className="text-xs text-slate-400">Doctors • 70,000+ Patients</div>
            </div>
          </div>
        </motion.aside>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto mt-6 text-yellow-700">
          {error}
        </div>
      )}
    </div>
  );
}
