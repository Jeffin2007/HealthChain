// backend/models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergencySchema = new Schema({
  name: String,
  relation: String,
  phone: String,
}, { _id: false });

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["patient","doctor","pharmacy"], required: true },

  // common profile
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  avatar: { type: String },

  // patient-specific fields
  age: Number,
  sex: String,
  bloodGroup: String,
  allergies: [String],
  emergencyContact: emergencySchema,

  // small array for quick UI (e.g. current meds summary)
  medicines: [{ type: String }], // frontend expects simple array for demo

  // current status (e.g. "Fever", notes, since date)
  currentStatus: {
    status: String,
    notes: String,
    since: Date
  },

  // assigned doctor references (primary and assistant)
  assignedDoctor: { type: Schema.Types.ObjectId, ref: "User" }, // primary
  assistantDoctor: { type: Schema.Types.ObjectId, ref: "User" }, // assistant

  // doctor-specific fields
  specialty: String,
  experienceYears: Number,
  verified: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);