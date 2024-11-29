import express from "express";
import { productController } from "../controllers/product.controller.js";
import { auth, validate } from "../middleware/index.js";
import {
  productSchema,
  stockUpdateSchema,
} from "../utils/validation-schemas.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(auth);

// Main CRUD routes
router.post("/", validate(productSchema), productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.put("/:id", validate(productSchema), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// Additional inventory management routes
router.get("/reports/low-stock", productController.getLowStock);
router.get("/reports/expiring", productController.getExpiringProducts);
router.patch(
  "/:id/stock",
  validate(stockUpdateSchema),
  productController.updateStock
);

export default router;
