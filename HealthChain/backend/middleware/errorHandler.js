const { sendError } = require('../utils/apiResponse');

const notFoundHandler = (req, res) => {
  return sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  if (process.env.NODE_ENV !== 'test') {
    console.error('[ERROR]', {
      path: req.originalUrl,
      method: req.method,
      message,
      stack: err.stack,
    });
  }

  return sendError(res, message, statusCode, err.details);
};

module.exports = { notFoundHandler, errorHandler };
