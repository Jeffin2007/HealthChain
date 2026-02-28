const { body } = require('express-validator');

const loginValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

module.exports = { loginValidation };