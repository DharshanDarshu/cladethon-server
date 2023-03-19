const express = require("express");
const {
  createOTP,
  getOTP,
  createOTPForgotten,
} = require("../controller/otpController");

const router = express.Router();

router.get("/:id", getOTP);
router.post("/", createOTP);
router.post("/forgetten", createOTPForgotten);

module.exports = router;
