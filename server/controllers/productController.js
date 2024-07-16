import productModel from "../models/productModel.js";
import { getDataUri } from "../utils/Features.js";
import cloudinary from "cloudinary";

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

// CREATE PRODUCT
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    // validation
    if (!name || !description || !price || !stock) {
      return res.status(400).send({
        success: false,
        message: "Please Enter All Fields",
      });
    }
    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "Please Select Image",
      });
    }
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cgb.public_id,
      url: cdb.secure_url,
    };
    await productModel.create({
      name,
      description,
      price,
      category,
      stock,
      images: [image],
    });
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while creating product",
      error,
    });
  }
};
