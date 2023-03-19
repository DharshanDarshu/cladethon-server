const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProduct,
  searchProductCategory,
  searchProductSubCategory,
} = require("../controller/productController");

const router = express.Router();

router.get("/", getAllProduct);
router.get("/search/category", searchProductCategory);
router.get("/search/subcategory", searchProductSubCategory);
router.get("/:id", getProduct);
router.post("/", createProduct);

module.exports = router;
