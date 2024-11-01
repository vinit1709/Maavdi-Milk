const express = require("express");
const router = express.Router();
const AddContact = require("../controllers/contact-controller");
const validate = require("../middlewares/validate-middleware");
const { contactSchema } = require("../validators/contact-validator");

// ----------------
// Add data route
// ----------------
router.route("/contact").post(validate(contactSchema), AddContact);

module.exports = router;