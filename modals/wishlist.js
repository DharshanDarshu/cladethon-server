const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
  email: String,
  wishlists: [
    {
      image: String,
      title: String,
      price: String,
      productId: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
