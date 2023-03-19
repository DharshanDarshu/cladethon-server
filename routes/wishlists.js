const express = require("express");
const {
  createWishList,
  updateWishList,
  getWishList,
  removeWishList,
  updateEmail,
} = require("../controller/wishListController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getWishList);
router.post("/", createWishList);
router.patch("/", auth, updateWishList);
router.patch("/remove", auth, removeWishList);
router.patch("/email", auth, updateEmail);

module.exports = router;
