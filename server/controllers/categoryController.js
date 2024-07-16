import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import { getDataUri } from "../utils/Features.js";
import cloudinary from "cloudinary";

// CREATE CATEGORY
export const createCategoryController = async (req, res) => {
  try {
    const { category } = req.body;
    // validation
    if (!category) {
      return res.status(401).send({
        success: false,
        message: "Please provide category name",
      });
    }
    await categoryModel.create({ category });
    res.status(201).send({
      success: true,
      message: `${category} category created successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating category",
      error,
    });
  }
};

// GET ALL CATEGORIES
export const getAllCategoriesController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories",
      totalCategories: category.length,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting categories",
      error,
    });
  }
};

// DELETE CATEGORY
export const deleteCategoryController = async (req, res) => {
  try {
    // find category
    const category = await categoryModel.findById(req.params.id);
    // validation
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found with this id",
      });
    }
    // find product with this category id
    const products = await productModel.find({ category: category._id });
    // update product category
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      product.category = undefined;
      await product.save();
    }
    // save
    await category.deleteOne();
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    // cast error || OBJECT ID ERROR
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid category ID",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};

// UPDATE CATEGORY
export const updateCategoryController = async (req, res) => {
  try {
    // find category
    const category = await categoryModel.findById(req.params.id);
    // validation
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found with this id",
      });
    }
    // get new category
    const { updatedCategory } = req.body;
    // find product with this category id
    const products = await productModel.find({ category: category._id });
    // update product category
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      product.category = updatedCategory;
      await product.save();
    }
    if (updatedCategory) category.category = updatedCategory;
    // save
    await category.save();
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.log(error);
    // cast error || OBJECT ID ERROR
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid category ID",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};
