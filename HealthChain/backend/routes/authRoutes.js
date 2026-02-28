const express = require('express');
const { login, register } = require('../controllers/authController');
const validateRequest = require('../middleware/validateRequest');
const { loginValidation } = require('../validators/authValidators');

const router = express.Router();

router.post('/login', loginValidation, validateRequest, login);
router.post('/register', register);

module.exports = router;
