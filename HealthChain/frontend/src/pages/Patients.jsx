import React from "react";
import { Link } from "react-router-dom";

export default function Patients() {
  return (
    <div className="p-6 pt-24 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Health Records</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {patients.map((p) => (
          <Link
            key={p.id}
            to={`/patients/${p.id}`}
            className="bg-white p-6 rounded-xl shadow-lg btn-hover"
          >
            <img src={p.photo} alt={p.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-bold text-center">{p.name}</h2>
            <p className="text-center text-gray-600">Age: {p.age} | Blood Group: {p.bloodGroup}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
