import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { checkBusinessSetup } from "../middleware/business.middleware.js";
import {
  createBusinessProfile,
  getBusinessProfile,
  updateBusinessProfile,
  checkProfileStatus
} from "../controllers/business.controller.js";

const router = express.Router();

// Status check endpoint - only checks after authentication
router.get("/status", protect, checkProfileStatus);

// Business Profile Routes (all protected)
router.post("/", protect, checkBusinessSetup, createBusinessProfile);
router.get("/", protect, checkBusinessSetup, getBusinessProfile);
router.put("/", protect, checkBusinessSetup, updateBusinessProfile);

export default router;