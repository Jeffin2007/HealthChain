// backend/controllers/doctorController.js
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Prescription = require("../models/Prescription");

const getDoctorPatients = async (req, res) => {
  // list patients assigned (for demo we find appointments)
  try {
    const doctorId = req.user._id;
    const appointments = await Appointment.find({ doctor: doctorId }).populate("patient", "name email phone");
    return res.json({ appointments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

const createPrescription = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const { patientId, meds, notes, deliveryETA } = req.body;
    const pres = new Prescription({
      patient: patientId,
      doctor: doctorId,
      meds,
      notes,
      deliveryETA
    });
    await pres.save();
    return res.json({ prescription: pres });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getDoctorPatients, createPrescription };