const express = require('express');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { riskPredictionValidation } = require('../validators/aiValidators');
const { getRiskPrediction } = require('../controllers/aiController');

const router = express.Router();

router.post('/risk-prediction', auth, role('doctor', 'patient'), riskPredictionValidation, validateRequest, getRiskPrediction);

module.exports = router;
