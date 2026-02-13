const { validationResult } = require('express-validator');
const { sendError } = require('../utils/apiResponse');

module.exports = function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendError(res, 'Validation failed', 422, errors.array());
  }

  next();
};
