// backend/models/Appointment.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  reason: String,
  status: { type: String, enum: ["scheduled","completed","cancelled"], default: "scheduled" },
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
