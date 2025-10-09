// backend/models/MedicalRecord.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  condition: String,
  notes: String,
  attachments: [String] // optional URLs
});

module.exports = mongoose.model("MedicalRecord", recordSchema);