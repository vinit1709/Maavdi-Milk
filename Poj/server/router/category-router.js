const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category-controller");

// ----------------
// Get data route
// ----------------
router.route("/getCategory").get(categoryController.GetCategory);

module.exports = router;