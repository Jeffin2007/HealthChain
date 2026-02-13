const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/apiResponse');

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).lean();
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  delete user.passwordHash;
  return sendSuccess(res, { user, token }, 'Login successful');
});

const register = asyncHandler(async (req, res) => {
  return sendSuccess(res, {}, 'Register endpoint reserved for future use', 501);
});

module.exports = { login, register };
