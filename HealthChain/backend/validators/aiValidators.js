const { isMongoId, pushError } = require('./_helpers');

function riskPredictionValidation(req, res, next) {
  const { patientId } = req.body || {};

  if (!isMongoId(patientId)) {
    pushError(req, 'valid patientId is required', 'patientId');
  }

  next();
}
const { body } = require('express-validator');

const riskPredictionValidation = [
  body('patientId').isMongoId().withMessage('valid patientId is required'),
];

module.exports = { riskPredictionValidation };
