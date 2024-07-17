import express from "express";
import { isAuth } from "./../middleware/authMiddleware.js";
import {
  acceptPaymentController,
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

// accept payment
router.post("/accept-payment/:id", isAuth, acceptPaymentController);

export default router;
