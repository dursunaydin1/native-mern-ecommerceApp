import express from "express";
import { isAdmin, isAuth } from "./../middleware/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// routes

// create category
router.post("/create", isAuth, isAdmin, createCategoryController);

// get all categories
router.get("/get-all", getAllCategoriesController);

// delete all category
router.delete("/delete/:id", isAuth, isAdmin, deleteCategoryController);

// update category
router.put("/update/:id", isAuth, isAdmin, updateCategoryController);

export default router;
