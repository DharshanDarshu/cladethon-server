const express = require("express");
const {
  createCart,
  updateCarts,
  getCartByEmail,
  removeCart,
  emptyCart,
  updateEmail,
} = require("../controller/cartController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getCartByEmail);
router.post("/", createCart);
router.patch("/", auth, updateCarts);
router.patch("/remove", auth, removeCart);
router.patch("/empty", emptyCart);
router.patch("/email", auth, updateEmail);

module.exports = router;
