const express = require("express");
const router = express.Router();
const { validate } = require("../middleware");
const { registerSchema, loginSchema } = require("../utils/validation-schemas");
const authController = require("../controllers/auth.controller");

// Auth routes
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);

module.exports = router;
