const { sendError } = require('../utils/apiResponse');

module.exports = function validateRequest(req, res, next) {
  const errors = req.validationErrors || [];

  if (errors.length > 0) {
    return sendError(res, 'Validation failed', 422, errors);
  }

  return next();
};
