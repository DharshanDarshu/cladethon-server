const Cart = require("../modals/cart");

module.exports.getCartByEmail = async (req, res) => {
  console.log(req.user.user.email);
  try {
    const cart = await Cart.findOne({
      email: req.user.user.email,
    });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.createCart = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res
        .status(400)
        .json({ err: "email should required" });
    }

    const carts = new Cart({ email: email });

    await carts.save();

    res.status(201).json(carts);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ err: e.message });
  }
};

module.exports.emptyCart = async (req, res) => {
  const { email } = req.body;
  try {
    const cart = await Cart.findOne({ email });
    console.log(cart);
    cart.carts = [];

    console.log(cart.carts);
    await cart.save();

    res.status(200).send(cart);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

module.exports.updateCarts = async (req, res) => {
  const substraction = req.query.sub;
  const { productId, image, price, items, title } =
    req.body;
  try {
    const carts = await Cart.findOne({
      email: req.user.user.email,
    });

    const checkingProduct = carts.carts.find(
      (cart) => productId == cart.productId,
    );
    const checkingProductIndex = carts.carts.findIndex(
      (cart) => productId == cart.productId,
    );

    if (checkingProduct) {
      const presentItems =
        carts.carts[checkingProductIndex].items;
      if (substraction) {
        if (carts.carts[checkingProductIndex].items > 0) {
          carts.carts[checkingProductIndex].items =
            presentItems - 1;
        }
      } else {
        carts.carts[checkingProductIndex].items =
          presentItems + 1;
      }
      await carts.save();
      return res.status(200).json(carts);
    }
    carts.carts.push({
      title,
      image,
      price,
      items,
      productId,
    });

    await carts.save();
    return res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.removeCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const carts = await Cart.findOne({
      email: req.user.user.email,
    });

    const checkingProduct = carts.carts.find(
      (cart) => productId == cart.productId,
    );
    const checkingProductIndex = carts.carts.findIndex(
      (cart) => productId == cart.productId,
    );

    if (checkingProduct) {
      const firstProduct = carts.carts.slice(
        0,
        checkingProductIndex,
      );
      const secondProduct = carts.carts.slice(
        checkingProductIndex + 1,
        carts.carts.length,
      );

      const finalProduct = [
        ...firstProduct,
        ...secondProduct,
      ];

      carts.carts = finalProduct;
      await carts.save();
      return res.status(200).json(carts);
    }

    res.status(200).json({ message: "no items to delete" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.updateEmail = async (req, res) => {
  const email = req.user.user.email;
  const newemail = req.body.email;
  try {
    const cart = await Cart.findOne({ email });

    cart.email = newemail;

    await cart.save();

    res
      .status(200)
      .json({ message: "successfully updated" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
