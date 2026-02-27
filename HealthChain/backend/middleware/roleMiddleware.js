const { sendError } = require('../utils/apiResponse');

module.exports = function allowRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(res, `Forbidden for role: ${req.user.role}`, 403);
    }

    next();
  };
};
