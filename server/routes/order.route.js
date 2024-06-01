const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getOrders,
  getMonthlyIncome,
} = require("../controllers/order.controller.js");
const { verifyAdmin, verifyToken } = require("../middleware/verifyToken.js");

const router = require("express").Router();

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyAdmin, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);
router.get("/:id", verifyToken, getUserOrder);
router.get("/", verifyToken, getOrders);
router.get("/stats/income", verifyAdmin, getMonthlyIncome);

module.exports = router;
