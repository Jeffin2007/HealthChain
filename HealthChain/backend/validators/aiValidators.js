const { body } = require('express-validator');

const riskPredictionValidation = [
  body('patientId').isMongoId().withMessage('valid patientId is required'),
];

module.exports = { riskPredictionValidation };
