const express = require("express");
const {
  createOTP,
  getOTP,
  createOTPForgotten,
} = require("../controller/otpController");

const router = express.Router();

router.get("/:id", getOTP);
router.post("/forgetten", createOTPForgotten);
router.post("/", createOTP);

module.exports = router;
