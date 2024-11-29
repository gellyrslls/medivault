import express from "express";
import { validateRequest } from "../middleware/index.js";
import { registerSchema, loginSchema } from "../utils/validation-schemas.js";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

// Auth routes
router.post(
  "/register",
  validateRequest(registerSchema),
  AuthController.register
);
router.post("/login", validateRequest(loginSchema), AuthController.login);
router.post("/logout", AuthController.logout);

export default router;
