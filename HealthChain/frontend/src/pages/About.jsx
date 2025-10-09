// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";

const devs = [
  { name: "Leo Das", role: "Lead Developer", img: "/images/leo.png"},
  { name: "Parthiban", role: "Backend Engineer", img: "/images/parthiban.jpg" }
];

export default function About() {
  return (
    <main className="min-h-[calc(100vh-72px)] p-12">
      <section className="text-center mb-12">
        <motion.h1 initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="text-4xl font-bold text-hc-700 mb-3">
          About HealthChain
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="max-w-2xl mx-auto text-muted">
          HealthChain is a demo platform to manage patient records and prescriptions with a modern glossy UI and smooth transitions.
        </motion.p>
      </section>

      <section className="flex justify-center gap-8">
        {devs.map((d, i) => (
          <motion.div key={d.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="w-72 bg-white gloss-card about-card parallax p-6 rounded-xl text-center cursor-pointer"
          >
            <img src={d.img} alt={d.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-red-200" />
            <h3 className="text-xl font-bold text-hc-700">{d.name}</h3>
            <p className="text-muted">{d.role}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
