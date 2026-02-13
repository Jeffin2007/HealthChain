const sendSuccess = (res, data = {}, message = 'OK', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, message = 'Server error', statusCode = 500, details = undefined) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
  });
};

module.exports = { sendSuccess, sendError };
