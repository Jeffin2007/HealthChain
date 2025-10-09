// backend/controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "username and password required" });

    const user = await User.findOne({ username }).lean();
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

    // remove sensitive fields
    delete user.passwordHash;
    return res.json({ user, token });
  } catch (err) {
    console.error("authController.login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const register = async (req, res) => {
  // (not required now) keep for completeness
};

module.exports = { login, register };
