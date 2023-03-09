const Category = require("../modals/category");

module.exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();

    res.status(200).json(category);
  } catch (err) {}
};

module.exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find({
      category: req.params.name,
    });

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.createCategory = async (req, res) => {
  const { category, image } = req.body;
  try {
    if (!category || !image) {
      return res
        .status(404)
        .json({ err: "all the field are required" });
    }
    const newCategory = new Category({
      category,
      image,
    });

    await newCategory.save();

    return res.status(201).json({ newCategory });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.updateCategory = async (req, res) => {
  const id = req.params.id;
  const { name, image } = req.body;
  try {
    const category = await Category.findById(id);

    category.subcategory.push({
      name,
      image,
    });

    await category.save();

    return res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
