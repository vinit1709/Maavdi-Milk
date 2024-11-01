const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order-controller");

// ----------------
// Add data route
// ----------------
router.route("/orders").post(orderController.AddOrder);

module.exports = router;