// backend/seed/seedDemo.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Prescription = require("../models/Prescription");
const MedicalRecord = require("../models/MedicalRecord");
const Appointment = require("../models/Appointment");

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // clear data (careful)
  await User.deleteMany({});
  await Prescription.deleteMany({});
  await MedicalRecord.deleteMany({});
  await Appointment.deleteMany({});

  // create primary doctor
  const doctor = new User({
    username: "drraj",
    passwordHash: await bcrypt.hash("doctor123", 10),
    role: "doctor",
    name: "Dr. S. Raj",
    email: "dr.raj@hospital.com",
    phone: "+91-1111111111",
    specialty: "General Physician",
    experienceYears: 12,
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=3"
  });
  await doctor.save();

  // assistant doctor
  const assistant = new User({
    username: "dranita",
    passwordHash: await bcrypt.hash("doctor123", 10),
    role: "doctor",
    name: "Dr. Anita Sharma",
    email: "anita@hospital.com",
    phone: "+91-2222222222",
    specialty: "Internal Medicine",
    experienceYears: 8,
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=5"
  });
  await assistant.save();

  // create patient (madhan)
  const patient = new User({
    username: "madhan",
    passwordHash: await bcrypt.hash("madhan123", 10),
    role: "patient",
    name: "Madhan Kumar",
    email: "madhan@example.com",
    phone: "+91-9876543210",
    avatar: "https://i.pravatar.cc/150?img=12",
    age: 29,
    sex: "Male",
    bloodGroup: "B+",
    allergies: ["Penicillin"],
    emergencyContact: { name: "S. Kumar", relation: "Father", phone: "+91-9999999999" },
    medicines: ["Paracetamol 500mg", "Azithromycin 500mg"],
    currentStatus: { status: "Fever", notes: "High temperature, advised rest", since: new Date() },
    assignedDoctor: doctor._id,
    assistantDoctor: assistant._id
  });
  await patient.save();

  // appointment
  const appt = new Appointment({
    patient: patient._id,
    doctor: doctor._id,
    date: new Date(),
    reason: "Fever & cough",
    status: "scheduled",
    notes: "Prescribed tests and meds"
  });
  await appt.save();

  // prescription
  const pres = new Prescription({
    patient: patient._id,
    doctor: doctor._id,
    meds: [
      { name: "Paracetamol", dosage: "500mg", frequency: "3 times a day", duration: "5 days" },
      { name: "Azithromycin", dosage: "500mg", frequency: "Once daily", duration: "3 days" }
    ],
    notes: "Drink plenty of fluids and rest",
    pharmacyStatus: "sent",
    deliveryETA: new Date(Date.now() + 4 * 60 * 60 * 1000) // 4 hours from now
  });
  await pres.save();

  // medical records
  await new MedicalRecord({ patient: patient._id, date: new Date("2022-09-10"), condition: "Fractured wrist", notes: "Cast applied - healed" }).save();
  await new MedicalRecord({ patient: patient._id, date: new Date("2023-02-20"), condition: "Seasonal flu", notes: "Prescribed rest" }).save();

  console.log("Seeding finished. Created: doctor, assistant, patient, appointment, prescription, records.");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});