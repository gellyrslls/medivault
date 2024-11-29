import express from "express";
import { validate } from "../middleware/index.js";
import { registerSchema, loginSchema } from "../utils/validation-schemas.js";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

// Auth routes
router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.post("/logout", AuthController.logout);

export default router;
