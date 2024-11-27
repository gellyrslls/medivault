const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Main CRUD routes
router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// Additional routes for inventory management
router.get("/reports/low-stock", productController.getLowStock);
router.get("/reports/expiring", productController.getExpiringProducts);

module.exports = router;
