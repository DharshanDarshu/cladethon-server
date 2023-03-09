const express = require("express");
const {
  createCategory,
  updateCategory,
  getAllCategory,
  getCategory,
} = require("../controller/categoryController");

const router = express.Router();

router.get("/", getAllCategory);
router.get("/:name", getCategory);
router.post("/", createCategory);
router.patch("/:id", updateCategory);

module.exports = router;
