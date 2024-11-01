const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const { signupSchema, signinSchema, emailValidate, userUpdateSchema, userUpdatePassword} = require("../validators/auth-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const validate = require("../middlewares/validate-middleware");

// ----------------
// Add data route
// ----------------
router.route("/register").post(validate(signupSchema), authController.register);
router.route("/login").post(validate(signinSchema), authController.login);
router.route("/forgot-password").post(validate(emailValidate), authController.forgotPassword);
router.route("/reset-password").post(authController.ResetPassword);

// ----------------
// Get data route
// ----------------
router.route("/user").get(authMiddleware, authController.user);

// ----------------------
// Get data by id route
// ----------------------
router.route("/view-order/:id").get(authController.viewOrder);

// -------------------
// Update data route
// -------------------
router.route("/profileUpdate/:id").post(validate(userUpdateSchema), authController.userProfileUpdate);
router.route("/passwordUpdate/:id").post(validate(userUpdatePassword), authController.userPasswordUpdate);

module.exports = router;