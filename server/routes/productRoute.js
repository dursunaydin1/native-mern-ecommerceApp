import express from "express";
import {
  createProductController,
  getAllProductsController,
  getSingleProductController,
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

export default router;
