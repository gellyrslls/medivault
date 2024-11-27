const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "any.required": "Current password is required",
  }),
  newPassword: Joi.string().min(6).required().messages({
    "string.min": "New password must be at least 6 characters long",
    "any.required": "New password is required",
  }),
});

const productSchema = Joi.object({
  name: Joi.string().required().trim(),
  sku: Joi.string().required().trim(),
  category: Joi.string().valid("OTC", "Prescription").required(),
  quantity: Joi.number().min(0).required(),
  minStockLevel: Joi.number().min(0).required(),
  price: Joi.number().min(0).required(),
  expiryDate: Joi.date().greater("now").required(),
  supplierId: Joi.string().required(), // MongoDB ObjectId
  description: Joi.string().allow("").optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  productSchema,
};
