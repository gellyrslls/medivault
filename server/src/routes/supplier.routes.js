import express from "express";
import { supplierController } from "../controllers/supplier.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validation.middleware.js";
import { supplierSchema } from "../models/supplier.model.js";

const router = express.Router();

// Apply authentication middleware to all supplier routes
router.use(authenticate);

// Create supplier
router.post("/", validateRequest(supplierSchema), supplierController.create);

// Get all suppliers with pagination and search
router.get("/", supplierController.getAll);

// Get supplier by ID with their products
router.get("/:id", supplierController.getById);

// Update supplier
router.put("/:id", validateRequest(supplierSchema), supplierController.update);

// Delete supplier
router.delete("/:id", supplierController.delete);

export default router;
