// backend/routes/patientRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getProfile } = require("../controllers/patientController");

router.get("/me", auth, role("patient"), getProfile);

module.exports = router;
