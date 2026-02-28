function isMongoId(value) {
  return typeof value === 'string' && /^[a-f\d]{24}$/i.test(value);
}

function isISODate(value) {
  if (typeof value !== 'string') return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

function pushError(req, msg, field) {
  if (!req.validationErrors) req.validationErrors = [];
  req.validationErrors.push({ msg, field });
}

module.exports = { isMongoId, isISODate, pushError };
