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
