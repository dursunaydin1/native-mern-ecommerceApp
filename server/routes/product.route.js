const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} = require("../controllers/product.controller.js");
const { verifyAdmin } = require("../middleware/verifyToken.js");
const { parser } = require("../utils/cloudinary.js");
const router = require("express").Router();

router.post("/", verifyAdmin, parser.single("image"), createProduct);
router.put("/:id", verifyAdmin, parser.single("image"), updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);
router.get("/:id", getProduct);
router.get("/", getProducts);

module.exports = router;
