const { body } = require('express-validator');

const loginValidation = [
  body('username').trim().notEmpty().withMessage('username is required'),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 chars'),
];

module.exports = { loginValidation };
