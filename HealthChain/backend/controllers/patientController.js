// backend/controllers/patientController.js
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const MedicalRecord = require("../models/MedicalRecord");

const getProfile = async (req, res) => {
  try {
    const patientId = req.user._id;

    // Load patient document and populate assigned doctors
    const patientDoc = await User.findById(patientId)
      .populate("assignedDoctor", "name specialty phone avatar")
      .populate("assistantDoctor", "name specialty phone avatar")
      .lean();

    if (!patientDoc) return res.status(404).json({ error: "Patient not found" });

    // Medical history
    const medicalHistory = await MedicalRecord.find({ patient: patientId }).sort({ date: -1 }).lean();

    // Appointments (populate doctor basic fields)
    const appointments = await Appointment.find({ patient: patientId }).populate("doctor", "name specialty avatar").sort({ date: -1 }).lean();

    // Prescriptions
    const prescriptions = await Prescription.find({ patient: patientId }).populate("doctor", "name avatar").sort({ createdAt: -1 }).lean();

    // Create a response object shaped for frontend convenience
    const patient = {
      _id: patientDoc._id,
      username: patientDoc.username,
      name: patientDoc.name,
      email: patientDoc.email,
      phone: patientDoc.phone,
      avatar: patientDoc.avatar,
      age: patientDoc.age,
      sex: patientDoc.sex,
      bloodGroup: patientDoc.bloodGroup,
      allergies: patientDoc.allergies || [],
      emergencyContact: patientDoc.emergencyContact || {},
      medicines: patientDoc.medicines || [],
      currentStatus: patientDoc.currentStatus || { status: "Unknown", notes: "", since: null },
      assignedDoctor: patientDoc.assignedDoctor || null,
      assistantDoctor: patientDoc.assistantDoctor || null,
      createdAt: patientDoc.createdAt
    };

    return res.json({
      patient,
      medicalHistory,
      appointments,
      prescriptions
    });
  } catch (err) {
    console.error("patientController.getProfile err:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getProfile };