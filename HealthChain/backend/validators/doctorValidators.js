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
const { body, param } = require('express-validator');

const createPrescriptionValidation = [
  body('patientId').isMongoId().withMessage('valid patientId is required'),
  body('meds').isArray({ min: 1 }).withMessage('meds must be a non-empty array'),
  body('meds.*.name').notEmpty().withMessage('med name is required'),
  body('meds.*.dosage').notEmpty().withMessage('med dosage is required'),
];

const updatePrescriptionValidation = [
  param('id').isMongoId().withMessage('valid prescription id is required'),
  body('pharmacyStatus')
    .optional()
    .isIn(['pending', 'sent', 'delivered'])
    .withMessage('invalid pharmacyStatus'),
  body('deliveryETA').optional().isISO8601().withMessage('deliveryETA must be valid date'),
];

module.exports = { createPrescriptionValidation, updatePrescriptionValidation };
