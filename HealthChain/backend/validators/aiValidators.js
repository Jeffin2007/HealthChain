const { isMongoId, pushError } = require('./_helpers');

function riskPredictionValidation(req, res, next) {
  const { patientId } = req.body || {};

  if (!isMongoId(patientId)) {
    pushError(req, 'valid patientId is required', 'patientId');
  }

  next();
}

module.exports = { riskPredictionValidation };
