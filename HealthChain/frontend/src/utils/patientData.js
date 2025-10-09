// sample data used by Dashboard for demo (no backend yet)
export const samplePatient = {
  _id: "patient-001",
  username: "madhan",
  password: "madhan123", // demo only — frontend demo auth
  name: "Madhan Kumar",
  age: 29,
  sex: "Male",
  bloodGroup: "B+",
  allergies: ["Penicillin"],
  contact: {
    phone: "+91-9876543210",
    email: "madhan@example.com",
    address: "12 A, Red Street, Chennai, India",
  },
  emergencyContact: {
    name: "S. Kumar",
    relation: "Father",
    phone: "+91-9999999999",
  },
  avatar: "/images/madhan.jpg",
  assignedDoctor: {
    _id: "doc-100",
    name: "Dr. S. Raj",
    specialty: "General Physician",
    contact: "dr.raj@hospital.com",
  },
  assistantDoctor: {
    _id: "doc-101",
    name: "Dr. Anita Sharma",
    specialty: "Internal Medicine",
    contact: "anita@hospital.com",
  },
  medicalHistory: [
    { date: "2022-09-10", condition: "Fractured wrist", notes: "Cast applied - healed" },
    { date: "2023-02-20", condition: "Seasonal flu", notes: "Prescribed rest & antivirals" }
  ],
  appointmentHistory: [
    { date: "2024-08-12", with: "Dr. S. Raj", reason: "Fever & cough" }
  ],
  prescriptions: [
    {
      id: "presc-001",
      date: "2025-09-04",
      doctor: "Dr. S. Raj",
      meds: [
        { name: "Paracetamol", dosage: "500mg", frequency: "3 times a day", duration: "5 days" },
        { name: "Azithromycin", dosage: "500mg", frequency: "Once daily", duration: "3 days" }
      ],
      notes: "Drink plenty of fluids"
    }
  ],
  currentStatus: {
    status: "Fever",
    since: "2025-09-04",
    notes: "Under observation"
  },
  pharmacy: {
    lastSent: "2025-09-04T12:30:00Z",
    deliveryETA: "2025-09-04T18:00:00Z",
    status: "Sent to pharmacy - delivery scheduled"
  }
};
