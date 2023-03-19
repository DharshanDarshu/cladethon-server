const express = require("express");
const {
  createOrder,
  updateOrder,
  getOrder,
  updatedEmail,
} = require("../controller/orderController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:email", getOrder);
router.post("/", createOrder);
router.patch("/", updateOrder);
router.patch("/email", auth, updatedEmail);

module.exports = router;
