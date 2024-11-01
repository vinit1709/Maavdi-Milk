const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const { userUpdateSchema } = require("../validators/auth-validator");
const { categorySchema } = require("../validators/category-validator");
const { productSchema } = require("../validators/product-validator");
const validate = require("../middlewares/validate-middleware");
const upload = require("../middlewares/multer");
const { todayUpdatesSchema } = require("../validators/todayUpdates-validate");
const { upcomingProductSchema } = require("../validators/upcoming-product-validator");

const router = express.Router();

// ----------------
// Add data route
// ----------------
router.route("/products/add").post(upload.single('productImg'), validate(productSchema), authMiddleware, adminMiddleware, adminController.addProducts);
router.route("/categorys/add").post(validate(categorySchema), authMiddleware, adminMiddleware, adminController.addCategorys);
router.route("/today-updates/add").post(validate(todayUpdatesSchema), authMiddleware, adminMiddleware, adminController.addTodayUpdates);
router.route("/upcoming-products/add").post(upload.single('productImg'), validate(upcomingProductSchema), authMiddleware, adminMiddleware, adminController.addUpcomingProducts);


// ----------------
// Get data route
// ----------------
router.route("/users").get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router.route("/contacts").get(authMiddleware, adminMiddleware, adminController.getAllContacts);
router.route("/products").get(authMiddleware, adminMiddleware, adminController.getAllProducts);
router.route("/categorys").get(authMiddleware, adminMiddleware, adminController.getAllCategory);
router.route("/vendors").get(authMiddleware, adminMiddleware, adminController.getAllVendors);
router.route("/orders").get(authMiddleware, adminMiddleware, adminController.getAllOrders);
router.route("/today-updates").get(authMiddleware, adminMiddleware, adminController.getAllTodayUpdates);
router.route("/upcoming-products").get(authMiddleware, adminMiddleware, adminController.getAllUpcomingProducts);


// ----------------------
// Get data by id route
// ----------------------
router.route("/users/:id").get(authMiddleware, adminMiddleware, adminController.getUsersById);
router.route("/products/:id").get(authMiddleware, adminMiddleware, adminController.getProductById);
router.route("/categorys/:id").get(authMiddleware, adminMiddleware, adminController.getCategorysById);
router.route("/vendors/:id").get(authMiddleware, adminMiddleware, adminController.getVendorsById);
router.route("/orders/:id").get(authMiddleware, adminMiddleware, adminController.getOrdersById);
router.route("/today-updates/:id").get(authMiddleware, adminMiddleware, adminController.getTodayUpdatesById);
router.route("/upcoming-products/:id").get(authMiddleware, adminMiddleware, adminController.getUpcomingProductById);


// ------------------
// Update data route
// ------------------
router.route("/users/update/:id").patch(validate(userUpdateSchema), authMiddleware, adminMiddleware, adminController.updateUserById);
router.route("/products/update/:id").patch(upload.single('productImg'), validate(productSchema), authMiddleware, adminMiddleware, adminController.updateProductById);
router.route("/categorys/update/:id").patch(validate(categorySchema), authMiddleware, adminMiddleware, adminController.updateCategoryById);
router.route("/today-updates/update/:id").patch(validate(todayUpdatesSchema), authMiddleware, adminMiddleware, adminController.updateTodayUpdatesById);
router.route("/upcoming-products/update/:id").patch(upload.single('productImg'), validate(upcomingProductSchema), authMiddleware, adminMiddleware, adminController.updateUpcomingProductById);


// ---------------------
// Confirm Vendor route
// ---------------------
router.route("/vendors/confirm/:id").patch(authMiddleware, adminMiddleware, adminController.confirmVendorsById);


// --------------------
// Reject Vendor route
// --------------------
router.route("/vendors/reject/:id").patch(authMiddleware, adminMiddleware, adminController.rejectVendorsById);


// -------------------
// Delete data route
// -------------------
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteContactById);
router.route("/products/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteProductById);
router.route("/categorys/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteCategoryById);
router.route("/vendors/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteVendorById);
router.route("/orders/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteOrderById);
router.route("/today-updates/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteTodayUpdatesById);
router.route("/upcoming-products/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUpcomingProductById);


// -------------------
// Chart data route
// -------------------
router.route("/total-sales").get(authMiddleware, adminMiddleware, adminController.getTotalSalesByProduct);
router.route("/today-sales").get(authMiddleware, adminMiddleware, adminController.getTodaySalesByProduct);
router.route("/last-month-user-data").get(authMiddleware, adminMiddleware, adminController.getTopUsersByProductLastMonth);
router.route("/top-user-data").get(authMiddleware, adminMiddleware, adminController.getTopUsersForAllProducts);


// -----------------------------
// Sales Report Generate route
// -----------------------------
router.route("/sales/report").get(authMiddleware, adminMiddleware, adminController.getSalesReport);

module.exports = router;