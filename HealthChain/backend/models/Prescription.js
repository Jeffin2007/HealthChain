// backend/models/Prescription.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medSchema = new Schema({
  name: String,
  dosage: String,
  frequency: String,
  duration: String
}, { _id: false });

const prescriptionSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  meds: [medSchema],
  notes: String,
  pharmacyStatus: { type: String, enum: ["pending","sent","delivered"], default: "pending" },
  deliveryETA: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prescription", prescriptionSchema);