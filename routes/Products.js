const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProduct,
} = require("../controller/productController");

const router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getProduct);
router.post("/", createProduct);

module.exports = router;
