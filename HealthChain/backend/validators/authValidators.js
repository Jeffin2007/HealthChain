const { pushError } = require('./_helpers');

function loginValidation(req, res, next) {
  const { username, password } = req.body || {};

  if (!username || !String(username).trim()) {
    pushError(req, 'username is required', 'username');
  }

  if (!password || String(password).length < 6) {
    pushError(req, 'password must be at least 6 chars', 'password');
  }

  next();
}

module.exports = { loginValidation };
