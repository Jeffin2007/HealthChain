const { body, param } = require('express-validator');

const createPrescriptionValidation = [
  body('patientId')
    .isMongoId()
    .withMessage('Valid patientId is required'),

  body('meds')
    .isArray({ min: 1 })
    .withMessage('meds must be a non-empty array'),

  body('meds.*.name')
    .notEmpty()
    .withMessage('Medication name is required'),

  body('meds.*.dosage')
    .notEmpty()
    .withMessage('Medication dosage is required'),
];

const updatePrescriptionValidation = [
  param('id')
    .isMongoId()
    .withMessage('Valid prescription id is required'),

  body('pharmacyStatus')
    .optional()
    .isIn(['pending', 'sent', 'delivered'])
    .withMessage('Invalid pharmacyStatus'),

  body('deliveryETA')
    .optional()
    .isISO8601()
    .withMessage('deliveryETA must be a valid date'),
];

module.exports = {
  createPrescriptionValidation,
  updatePrescriptionValidation,
};