const express = require("express");
const { auth, validate } = require("../middleware");
const AuthController = require("../controllers/auth.controller");
const {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} = require("../utils/validation-schemas");

const router = express.Router();

// Public routes
router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);

// Protected routes
router.use(auth);
router.get("/me", AuthController.getCurrentUser);
router.post(
  "/change-password",
  validate(changePasswordSchema),
  AuthController.changePassword
);
router.post("/logout", AuthController.logout);

module.exports = router;
