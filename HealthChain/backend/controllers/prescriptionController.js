const Prescription = require('../models/Prescription');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/apiResponse');

const listForPatient = asyncHandler(async (req, res) => {
  const patientId = req.user._id;
  const prescriptions = await Prescription.find({ patient: patientId }).populate('doctor', 'name').lean();
  return sendSuccess(res, { prescriptions }, 'Prescriptions fetched');
});

const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { pharmacyStatus, deliveryETA } = req.body;

  const prescription = await Prescription.findByIdAndUpdate(
    id,
    { pharmacyStatus, deliveryETA },
    { new: true }
  );

  if (!prescription) {
    throw new AppError('Prescription not found', 404);
  }

  return sendSuccess(res, { prescription }, 'Prescription updated');
});

module.exports = { listForPatient, updateStatus };
