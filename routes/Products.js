const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProduct,
  searchProductCategory,
  searchProductSubCategory,
  updateRatings,
} = require("../controller/productController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllProduct);
router.get("/search/category", searchProductCategory);
router.get("/search/subcategory", searchProductSubCategory);
router.get("/:id", getProduct);
router.post("/", auth, createProduct);
router.patch("/:id", auth, updateRatings);

module.exports = router;
