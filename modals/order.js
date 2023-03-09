const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  email: String,
  orders: [
    {
      image: String,
      title: String,
      price: String,
      productId: mongoose.Schema.Types.ObjectId,
      items: Number,
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
