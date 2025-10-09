// backend/controllers/prescriptionController.js
const Prescription = require("../models/Prescription");

const listForPatient = async (req, res) => {
  try {
    const patientId = req.user._id;
    const list = await Prescription.find({ patient: patientId }).populate("doctor", "name");
    res.json({ prescriptions: list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { pharmacyStatus, deliveryETA } = req.body;
    const pres = await Prescription.findByIdAndUpdate(id, { pharmacyStatus, deliveryETA }, { new: true });
    res.json({ prescription: pres });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { listForPatient, updateStatus };