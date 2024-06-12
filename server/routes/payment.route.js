const { stripe } = require("../controllers/payment.controller.js");

const router = require("express").Router();

router.post("/", stripe);

module.exports = router;
