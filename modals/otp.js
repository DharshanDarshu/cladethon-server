const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    expires: "5m",
    default: Date.now,
  },
});

const OTP = mongoose.model("Token", tokenSchema);

module.exports = OTP;
