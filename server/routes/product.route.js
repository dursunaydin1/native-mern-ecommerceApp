const { createProduct } = require("../controllers/product.controller.js");
const { verifyAdmin } = require("../middleware/verifyToken.js");

const router = require("express").Router();

router.get("/", verifyAdmin, createProduct);
module.exports = router;
