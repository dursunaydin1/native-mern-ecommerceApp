const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getOrders,
} = require("../controllers/order.controller.js");
const { verifyAdmin, verifyToken } = require("../middleware/verifyToken.js");

const router = require("express").Router();

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyAdmin, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);
router.get("/:id", verifyToken, getUserOrder);
router.get("/", verifyToken, getOrders);

module.exports = router;
