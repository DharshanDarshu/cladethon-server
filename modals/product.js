const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    lowercase: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    lowercase: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
  },
  subcategory: {
    type: String,
    required: true,
    lowercase: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    rate: Number,
    count: Number,
  },
  offer: {
    type: Boolean,
  },
  offer_details: {
    type: String,
    lowercase: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
