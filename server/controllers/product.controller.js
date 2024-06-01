const Product = require("../models/product.model.js");

const createProduct = async (req, res) => {
  try {
    const categories = req.body.categories
      ? req.body.categories.split(",")
      : [];
    const newProduct = new Product({
      ...req.body,
      categories,
      image: req.file.path,
    });
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

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured while updating product",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured while deleting product",
      error: error.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occured while fetching product",
      error: err.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const qLatest = req.query.latest;
    const qCategory = req.query.category;

    let product;

    if (qLatest) {
      product = await Product.find().sort({ createdAt: -1 }).limit(3);
    } else if (qCategory) {
      product = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      product = await Product.find();
    }

    res.status(200).json({
      message: "Products fetched successfully",
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occured while fetching products",
      error: err.message,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
