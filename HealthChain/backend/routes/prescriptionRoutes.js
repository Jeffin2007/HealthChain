// backend/routes/prescriptionRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { listForPatient, updateStatus } = require("../controllers/prescriptionController");

router.get("/me", auth, listForPatient);
router.patch("/:id", auth, updateStatus); // allow pharmacy/doctor to update status (in real app add role checks)

module.exports = router;