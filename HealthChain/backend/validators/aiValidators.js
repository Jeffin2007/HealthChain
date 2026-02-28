const { body } = require('express-validator');

const riskPredictionValidation = [
  body('patientId')
    .isMongoId()
    .withMessage('Valid patientId is required'),
];

module.exports = { riskPredictionValidation };
