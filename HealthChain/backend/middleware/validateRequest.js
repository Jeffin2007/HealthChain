const { sendError } = require('../utils/apiResponse');

module.exports = function validateRequest(req, res, next) {
  const errors = req.validationErrors || [];

  if (errors.length > 0) {
    return sendError(res, 'Validation failed', 422, errors);
  }

  return next();
const { validationResult } = require('express-validator');
const { sendError } = require('../utils/apiResponse');

module.exports = function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendError(res, 'Validation failed', 422, errors.array());
  }

  next();
};
