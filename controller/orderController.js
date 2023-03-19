const Order = require("../modals/order");

module.exports.getOrder = async (req, res) => {
  const email = req.params.email;
  try {
    const order = await Order.findOne({ email });

    console.log(order);

    res.status(200).json(order);
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};

module.exports.createOrder = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ err: "email should required" });
    }

    const order = new Order({ email });

    await order.save();

    res.status(201).json(order);
  } catch (err) {}
};

module.exports.updateOrder = async (req, res) => {
  const { email, product } = req.body;
  try {
    const order = await Order.findOne({ email });

    order.orders.push(product);

    await order.save();

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.updatedEmail = async (req, res) => {
  const email = req.user.user.email;
  const newemail = req.body.email;
  try {
    const order = await Order.findOne({ email });

    order.email = newemail;

    await order.save();
    res
      .status(200)
      .json({ message: "successfully updated" });
  } catch (err) {
    res.status(500).jsn({ err: err.message });
  }
};
