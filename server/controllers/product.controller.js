const Product = require("../models/product.model.js");

const createProduct = async (req, res) => {
  const newProduct = new Product({
    ...req.body,
    image: req.file.path,
    user: req.user._id,
  });
  try {
    await newProduct.save();
    res.status(200).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occured while creating product",
      error: err.message,
    });
  }
};

module.exports = { createProduct };
