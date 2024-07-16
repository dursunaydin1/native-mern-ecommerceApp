import productModel from "../models/productModel.js";

// GET ALL PRODUCTS
export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).send({
      success: true,
      message: "All Products Fetched Successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting products",
      error,
    });
  }
};

// GET SINGLE PRODUCT
export const getSingleProductController = async (req, res) => {
  try {
    // get product id
    const product = await productModel.findById(req.params.id);
    // validation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product Not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Single Product Fetched Successfully",
      product,
    });
  } catch (error) {
    // cast error || OBJECT ID ERROR
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Product ID",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error while getting product",
      error,
    });
  }
};
