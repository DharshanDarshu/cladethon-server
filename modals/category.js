const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    lowercase: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  subcategory: [
    {
      name: String,
      image: String,
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
