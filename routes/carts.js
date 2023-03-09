const express = require("express");
const {
  createCart,
  updateCarts,
  getCartByEmail,
  removeCart,
  emptyCart,
} = require("../controller/cartController");

const router = express.Router();

router.get("/:email", getCartByEmail);
router.post("/", createCart);
router.patch("/", updateCarts);
router.patch("/remove", removeCart);
router.patch("/empty", emptyCart);

module.exports = router;
