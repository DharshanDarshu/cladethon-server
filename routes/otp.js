const express = require("express");
const {
  createOTP,
  getOTP,
} = require("../controller/otpController");

const router = express.Router();

router.get("/:id", getOTP);
router.post("/", createOTP);

module.exports = router;
