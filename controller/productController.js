const Product = require("../modals/product");

module.exports.searchProductCategory = async (req, res) => {
  const search = req.query.search;

  try {
    const productCategory = await Product.find({
      category: search,
    });

    const productSubCategory = await Product.find({
      subcategory: search,
    });

    const productName = await Product.find({
      title: { $regex: search },
    });

    const product1 = productCategory.concat(
      productSubCategory,
    );

    const products = product1.concat(productName);

    for (var i = 0; i < products.length; ++i) {
      for (var j = i + 1; j < products.length; ++j) {
        if (products[i]._id === products[j]._id)
          products.splice(j--, 1);
      }
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.searchProductSubCategory = async (
  req,
  res,
) => {
  const search = req.query.search;

  try {
    const product = await Product.find({
      subcategory: { $regex: search },
    });

    res.status(200).json(product);
  } catch (err) {}
};

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
  const email = req.user.user.email;
  const admin = process.env.ADMIN;
  try {
    console.log(email, admin);
    if (email !== admin) {
      res
        .status(400)
        .json({ err: "You can't create Products" });
      return;
    }
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

module.exports.updateRatings = async (req, res) => {
  const id = req.params.id;
  const { email, firstname, lastname } = req.user.user;
  const { rating, comment } = req.body;
  const user = {
    email,
    firstname,
    lastname,
  };
  try {
    const product = await Product.findById(id);

    const ratings = {
      user,
      rating,
      message: comment,
    };

    product.ratings.push(ratings);
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
