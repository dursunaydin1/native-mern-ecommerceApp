import express from "express";
import { isAuth } from "./../middleware/authMiddleware.js";
import { createOrderController } from "../controllers/orderController.js";

const router = express.Router();

// rotues

// create order
router.post("/create", isAuth, createOrderController);

// get all orders
router.get("/get-all", isAuth, getAllOrdersController);

// get single order
router.get("/get/:id", isAuth, getSingleOrderController);

// update order
router.put("/update/:id", isAuth, updateOrderController);

// delete order
router.delete("/delete/:id", isAuth, deleteOrderController);

export default router;
