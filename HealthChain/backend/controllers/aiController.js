const User = require('../models/User');
const MedicalRecord = require('../models/MedicalRecord');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/apiResponse');

const getRiskPrediction = asyncHandler(async (req, res) => {
  const { patientId } = req.body;

  const patient = await User.findById(patientId).lean();
  if (!patient || patient.role !== 'patient') {
    throw new AppError('Patient not found', 404);
  }

  const records = await MedicalRecord.find({ patient: patientId }).sort({ date: -1 }).limit(10).lean();

  const factors = [];
  let riskScore = 0.2;

  if ((patient.age || 0) >= 60) {
    riskScore += 0.2;
    factors.push({ factor: 'age_over_60', impact: 0.2 });
  }

  const hasChronic = records.some((r) => /diabetes|hypertension|cardiac/i.test(`${r.condition || ''}`));
  if (hasChronic) {
    riskScore += 0.3;
    factors.push({ factor: 'chronic_condition_history', impact: 0.3 });
  }

  if ((patient.allergies || []).length >= 3) {
    riskScore += 0.1;
    factors.push({ factor: 'multiple_allergies', impact: 0.1 });
  }

  if (records.length >= 5) {
    riskScore += 0.15;
    factors.push({ factor: 'recent_high_visit_frequency', impact: 0.15 });
  }

  riskScore = Math.max(0.01, Math.min(0.99, Number(riskScore.toFixed(2))));

  const riskBand = riskScore >= 0.75 ? 'HIGH' : riskScore >= 0.45 ? 'MEDIUM' : 'LOW';

  return sendSuccess(
    res,
    {
      patientId,
      riskScore,
      riskBand,
      factors,
      model: {
        name: 'HealthChain-DemoRiskModel',
        version: 'v1-mock',
        type: 'rule-based',
      },
    },
    'Risk prediction generated'
  );
});

module.exports = { getRiskPrediction };
