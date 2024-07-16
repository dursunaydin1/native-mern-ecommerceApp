import express from "express";
import {
  getAllProductsController,
  getSingleProductController,
} from "../controllers/productController.js";

const router = express.Router();

// routes
// get all products,
router.get("/get-all", getAllProductsController);

// get single product
router.get("/:id", getSingleProductController);

export default router;
