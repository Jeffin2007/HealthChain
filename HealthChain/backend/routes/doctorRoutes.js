const express = require('express');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { getDoctorPatients, createPrescription } = require('../controllers/doctorController');
const { createPrescriptionValidation } = require('../validators/doctorValidators');

const router = express.Router();

router.get('/patients', auth, role('doctor'), getDoctorPatients);
router.post('/prescriptions', auth, role('doctor'), createPrescriptionValidation, validateRequest, createPrescription);

module.exports = router;
