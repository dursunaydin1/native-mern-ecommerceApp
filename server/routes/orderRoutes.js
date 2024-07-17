import express from "express";
import { isAdmin, isAuth } from "./../middleware/authMiddleware.js";
import {
  acceptPaymentController,
  createOrderController,
  getAllOrdersController,
  getOrdersController,
  getSingleOrderController,
  updateOrderStatusController,
} from "../controllers/orderController.js";

const router = express.Router();

// rotues

// create order
router.post("/create", isAuth, createOrderController);

// get all orders
router.get("/my-orders", isAuth, getOrdersController);

// get single order
router.get("/my-orders/:id", isAuth, getSingleOrderController);

// accept payment
router.post("/accept-payment/:id", isAuth, acceptPaymentController);

//  ===== ADMIN PANEL ROUTES =====
// get all orders
router.get("/admin/get-all-orders", isAuth, isAdmin, getAllOrdersController);

// update order status
router.put(
  "/admin/update-order-status/:id",
  isAuth,
  isAdmin,
  updateOrderStatusController
);

export default router;
