const express = require("express");
const {
  signUp,
  login,
  getUser,
  updateUser,
  changePassword,
  updateEmail,
  updateForgettenPassword,
} = require("../controller/authController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getUser);
router.post("/signup", signUp);
router.patch("/", auth, updateUser);
router.patch("/change", auth, changePassword);
router.patch("/change-email", auth, updateEmail);
router.patch("/forgetten", updateForgettenPassword);
router.post("/login", login);

module.exports = router;
