const express = require('express');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { updatePrescriptionValidation } = require('../validators/doctorValidators');
const { listForPatient, updateStatus } = require('../controllers/prescriptionController');

const router = express.Router();

router.get('/me', auth, role('patient'), listForPatient);
router.patch('/:id', auth, role('pharmacy', 'doctor'), updatePrescriptionValidation, validateRequest, updateStatus);

module.exports = router;
