// frontend/src/utils/dummyData.js
// Exports both named exports and a default export so any import style works.

export const patients = [
  {
    id: "patient-001",
    username: "madhan",
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
    assignedDoctorId: "doc-100",
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
        doctorId: "doc-100",
        meds: [
          { name: "Paracetamol", dosage: "500mg", frequency: "3 times a day", duration: "5 days" },
          { name: "Azithromycin", dosage: "500mg", frequency: "Once daily", duration: "3 days" }
        ],
        notes: "Drink plenty of fluids",
        pharmacyStatus: "Sent to pharmacy - delivery scheduled",
        deliveryETA: "2025-09-04T18:00:00Z"
      }
    ],
    currentStatus: { status: "Fever", since: "2025-09-04", notes: "Under observation" }
  }
];

export const doctors = [
  {
    id: "doc-100",
    name: "Dr. S. Raj",
    specialty: "General Physician",
    contact: "dr.raj@hospital.com",
    experienceYears: 12,
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "doc-101",
    name: "Dr. Anita Sharma",
    specialty: "Internal Medicine",
    contact: "anita@hospital.com",
    experienceYears: 8,
    avatar: "https://i.pravatar.cc/150?img=5"
  }
];

// Default export for code that expects `import dummyData from '../utils/dummyData'`
export default {
  patients,
  doctors,
};
