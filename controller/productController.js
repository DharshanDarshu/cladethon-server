const Product = require("../modals/product");

module.exports.getAllProduct = async (req, res) => {
  const category = req.query.category;
  const subcategory = req.query.subcategory;
  try {
    if (category && subcategory) {
      const product = await Product.find({
        category,
        subcategory,
      });
      return res.status(200).json(product);
    }

    if (category) {
      const product = await Product.find({
        category,
      });
      return res.status(200).json(product);
    }

    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status().json({ err: err.message });
  }
};

module.exports.getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.createProduct = async (req, res) => {
  const {
    title,
    price,
    description,
    brand,
    category,
    subcategory,
    image,
    rating,
    offer,
    offer_details,
  } = req.body;
  try {
    if (
      !title ||
      !price ||
      !description ||
      !brand ||
      !category ||
      !subcategory ||
      !image
    ) {
      return res
        .status(404)
        .json({ err: "All the field should required" });
    }

    const product = new Product({
      title,
      price,
      description,
      brand,
      category,
      subcategory,
      image,
      rating,
      offer,
      offer_details,
    });

    await product.save();

    return res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
