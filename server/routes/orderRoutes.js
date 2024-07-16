import express from "express";
import { isAuth } from "./../middleware/authMiddleware.js";
import {
  createOrderController,
  getAllOrdersController,
  getSingleOrderController,
} from "../controllers/orderController.js";

const router = express.Router();

// rotues

// create order
router.post("/create", isAuth, createOrderController);

// get all orders
router.get("/my-orders", isAuth, getAllOrdersController);

// get single order
router.get("/my-orders/:id", isAuth, getSingleOrderController);

// update order
router.put("/update/:id", isAuth, updateOrderController);

// delete order
router.delete("/delete/:id", isAuth, deleteOrderController);

export default router;
