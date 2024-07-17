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

// UPDATE PRODUCT
export const updateProductController = async (req, res) => {
  try {
    //   find product
    const product = await productModel.findById(req.params.id);
    //   validation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product Not Found",
      });
    }
    const { name, description, price, category, stock } = req.body;
    //   validation and update
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock) product.stock = stock;
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
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
      message: "Error while updating product",
      error,
    });
  }
};

// UPDATE PRODUCT IMAGE
export const updateProductImageController = async (req, res) => {
  try {
    //   find product
    const product = await productModel.findById(req.params.id);
    //   validation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product Not Found",
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
    product.images = [...product.images, image];
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product Image Updated Successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updating product image",
      error,
    });
  }
};

// DELETE PRODUCT IMAGE
export const deleteProductImageController = async (req, res) => {
  try {
    //   find product
    const product = await productModel.findById(req.params.id);
    //   validation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product Not Found",
      });
    }
    // image id find
    const id = req.query.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Image Not Found",
      });
    }

    let isExist = -1;
    product.images.forEach((image, index) => {
      if (item._id.toString() === id.toString()) {
        isExist = index;
      }
    });

    if (isExist === -1) {
      return res.status(404).send({
        success: false,
        message: "Image Not Found",
      });
    }
    // delete product image

    await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
    product.images.splice(isExist, 1);
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product Image Deleted Successfully",
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
      message: "Error while deleting product image",
      error,
    });
  }
};

// DELETE PRODUCT
export const deleteProductController = async (req, res) => {
  try {
    //   find product
    const product = await productModel.findById(req.params.id);
    //   validation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product Not Found",
      });
    }
    // find and delete image cloudinary
    for (let index = 0; index < product.images.length; index++) {
      await cloudinary.v2.uploader.destroy(product.images[index].public_id);
    }
    await product.deleteOne();
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
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
      message: "Error while deleting product",
      error,
    });
  }
};

// create product review and comment
export const productReviewController = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    //  find product
    const product = await productModel.findById(req.params.id);
    // create previous review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).send({
        success: false,
        message: "Already Reviewed",
      });
    }
    // review object
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    // create review
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    // save product
    await product.save();
    res.status(200).send({
      success: true,
      message: "Review Added Successfully",
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
      message: "Error while deleting product",
      error,
    });
  }
};
