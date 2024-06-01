const { createProduct } = require("../controllers/product.controller.js");
const { verifyAdmin } = require("../middleware/verifyToken.js");
const { parser } = require("../utils/cloudinary.js");
const router = require("express").Router();

router.post("/", verifyAdmin, parser.single("image"), createProduct);
module.exports = router;
