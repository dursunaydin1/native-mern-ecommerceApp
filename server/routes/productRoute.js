import express from "express";
import {
  createProductController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
  updateProductImageController,
} from "../controllers/productController.js";
import { isAuth } from "./../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

// routes
// get all products,
router.get("/get-all", getAllProductsController);

// get single product
router.get("/:id", getSingleProductController);

// create product
router.post("/create", isAuth, singleUpload, createProductController);

// update product
router.put("/:id", isAuth, updateProductController);

// update product image
router.put(
  "/update-image/:id",
  isAuth,
  singleUpload,
  updateProductImageController
);

export default router;
