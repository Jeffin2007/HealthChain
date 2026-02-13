const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');

const getDoctorPatients = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;
  const appointments = await Appointment.find({ doctor: doctorId })
    .populate('patient', 'name email phone')
    .lean();

  return sendSuccess(res, { appointments }, 'Doctor appointments fetched');
});

const createPrescription = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;
  const { patientId, meds, notes, deliveryETA } = req.body;

  const pres = new Prescription({
    patient: patientId,
    doctor: doctorId,
    meds,
    notes,
    deliveryETA,
  });

  await pres.save();
  return sendSuccess(res, { prescription: pres }, 'Prescription created', 201);
});

module.exports = { getDoctorPatients, createPrescription };
