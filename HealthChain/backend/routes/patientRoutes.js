const express = require('express');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { getProfile } = require('../controllers/patientController');

const router = express.Router();

router.get('/me', auth, role('patient'), getProfile);

module.exports = router;
