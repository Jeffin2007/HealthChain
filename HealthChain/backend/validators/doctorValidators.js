const { isISODate, isMongoId, pushError } = require('./_helpers');

function createPrescriptionValidation(req, res, next) {
  const { patientId, meds } = req.body || {};

  if (!isMongoId(patientId)) {
    pushError(req, 'valid patientId is required', 'patientId');
  }

  if (!Array.isArray(meds) || meds.length === 0) {
    pushError(req, 'meds must be a non-empty array', 'meds');
  } else {
    meds.forEach((med, idx) => {
      if (!med?.name) pushError(req, 'med name is required', `meds[${idx}].name`);
      if (!med?.dosage) pushError(req, 'med dosage is required', `meds[${idx}].dosage`);
    });
  }

  next();
}

function updatePrescriptionValidation(req, res, next) {
  const { id } = req.params || {};
  const { pharmacyStatus, deliveryETA } = req.body || {};

  if (!isMongoId(id)) {
    pushError(req, 'valid prescription id is required', 'id');
  }

  if (pharmacyStatus && !['pending', 'sent', 'delivered'].includes(pharmacyStatus)) {
    pushError(req, 'invalid pharmacyStatus', 'pharmacyStatus');
  }

  if (deliveryETA && !isISODate(deliveryETA)) {
    pushError(req, 'deliveryETA must be valid date', 'deliveryETA');
  }

  next();
}

module.exports = { createPrescriptionValidation, updatePrescriptionValidation };
