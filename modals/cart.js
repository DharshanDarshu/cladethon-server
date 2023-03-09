const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  email: {
    type: String,
  },
  carts: [
    {
      image: String,
      title: String,
      price: String,
      productId: mongoose.Schema.Types.ObjectId,
      items: Number,
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
