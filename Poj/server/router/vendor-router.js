const express = require("express");
const validate = require("../middlewares/validate-middleware");
const { vendorSchema } = require("../validators/vendor-validator");
const AddVendor = require("../controllers/vendor-controller");
const router = express.Router();

// ----------------
// Add data route
// ----------------
router.route("/vendor").post(validate(vendorSchema), AddVendor)

module.exports = router;