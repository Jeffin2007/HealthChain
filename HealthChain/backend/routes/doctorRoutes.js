// backend/routes/doctorRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getDoctorPatients, createPrescription } = require("../controllers/doctorController");

router.get("/patients", auth, role("doctor"), getDoctorPatients);
router.post("/prescriptions", auth, role("doctor"), createPrescription);

module.exports = router;