const express = require("express");
const {
  createOrder,
  updateOrder,
  getOrder,
} = require("../controller/orderController");

const router = express.Router();

router.get("/:email", getOrder);
router.post("/", createOrder);
router.patch("/", updateOrder);

module.exports = router;
