const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const MedicalRecord = require('../models/MedicalRecord');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/apiResponse');

const getProfile = asyncHandler(async (req, res) => {
  const patientId = req.user._id;

  const patientDoc = await User.findById(patientId)
    .populate('assignedDoctor', 'name specialty phone avatar')
    .populate('assistantDoctor', 'name specialty phone avatar')
    .lean();

  if (!patientDoc) {
    throw new AppError('Patient not found', 404);
  }

  const medicalHistory = await MedicalRecord.find({ patient: patientId }).sort({ date: -1 }).lean();
  const appointments = await Appointment.find({ patient: patientId })
    .populate('doctor', 'name specialty avatar')
    .sort({ date: -1 })
    .lean();
  const prescriptions = await Prescription.find({ patient: patientId })
    .populate('doctor', 'name avatar')
    .sort({ createdAt: -1 })
    .lean();

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
    currentStatus: patientDoc.currentStatus || { status: 'Unknown', notes: '', since: null },
    assignedDoctor: patientDoc.assignedDoctor || null,
    assistantDoctor: patientDoc.assistantDoctor || null,
    createdAt: patientDoc.createdAt,
  };

  return sendSuccess(
    res,
    { patient, medicalHistory, appointments, prescriptions },
    'Patient profile fetched'
  );
});

module.exports = { getProfile };
