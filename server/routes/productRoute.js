import express from "express";
import {
  createProductController,
  deleteProductController,
  deleteProductImageController,
  getAllProductsController,
  getSingleProductController,
  getTopProductsController,
  productReviewController,
  updateProductController,
  updateProductImageController,
} from "../controllers/productController.js";
import { isAdmin, isAuth } from "./../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

// routes
// get all products,
router.get("/get-all", getAllProductsController);

// get top products,
router.get("/top", getTopProductsController);

// get single product
router.get("/:id", getSingleProductController);

// create product
router.post("/create", isAuth, isAdmin, singleUpload, createProductController);

// update product
router.put("/:id", isAuth, isAdmin, updateProductController);

// update product image
router.put(
  "/update-image/:id",
  isAuth,
  isAdmin,
  singleUpload,
  updateProductImageController
);

// delete product image
router.delete(
  "/delete-image/:id",
  isAuth,
  isAdmin,
  deleteProductImageController
);

// delete product
router.delete("/delete/:id", isAuth, isAdmin, deleteProductController);

// Review Product
router.put("/review/:id", isAuth, productReviewController);

export default router;
