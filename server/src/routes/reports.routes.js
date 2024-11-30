import express from "express";
import { getReports } from "../controllers/reports.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(auth); // Protect all reports routes

router.get("/low-stock", getReports.getLowStock);
router.get("/inventory-status", getReports.getInventoryStatus);
router.get("/expiring-soon", getReports.getExpiringSoon);

export default router;
