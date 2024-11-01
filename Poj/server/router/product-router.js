const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller")

// ----------------
// Get data route
// ----------------
router.route("/product").get(productController.GetProduct);

// ----------------------
// Get data by id route
// ----------------------
router.route("/product/:id").get(productController.GetProductId);

module.exports = router;