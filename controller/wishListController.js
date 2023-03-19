const Wishlist = require("../modals/wishlist");

module.exports.getWishList = async (req, res) => {
  const email = req.user.user.email;
  try {
    const wishlist = await Wishlist.findOne({
      email,
    });

    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.createWishList = async (req, res) => {
  const { email } = req.body;

  try {
    const wishlist = new WishList({ email });

    await wishlist.save();

    res.status(201).json(wishlist);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.updateWishList = async (req, res) => {
  const email = req.user.user.email;

  const { image, price, title, productId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ email });

    wishlist.wishlists.push({
      image,
      price,
      title,
      productId,
    });

    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.removeWishList = async (req, res) => {
  const email = req.user.user.email;
  const { productId } = req.body;
  console.log(productId);
  try {
    const wishlist = await Wishlist.findOne({ email });

    const wishlistFilter = wishlist.wishlists.filter(
      (list) => productId !== list.productId.toString(),
    );

    wishlist.wishlists = wishlistFilter;

    await wishlist.save();

    res.status(200).json({ wishlist });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.updateEmail = async (req, res) => {
  const email = req.user.user.email;
  const newemail = req.body.email;
  try {
    const wishlist = await Wishlist.findOne({ email });

    wishlist.email = newemail;

    await wishlist.save();

    res
      .status(200)
      .json({ message: "successfully updated" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
