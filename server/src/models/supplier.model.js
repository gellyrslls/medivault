import mongoose from "mongoose";
import Joi from "joi";

// Validation Schema using Joi
export const supplierSchema = Joi.object({
  name: Joi.string().required().min(2).max(100).messages({
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 100 characters",
    "any.required": "Name is required",
  }),
  contactPerson: Joi.string().required().min(2).messages({
    "string.min": "Contact person name must be at least 2 characters",
    "any.required": "Contact person is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  phone: Joi.string()
    .required()
    .pattern(/^\+?[\d\s-]{10,}$/)
    .messages({
      "string.pattern.base": "Invalid phone number format",
      "any.required": "Phone number is required",
    }),
  address: Joi.string().allow("").optional(),
  notes: Joi.string().allow("").optional(),
});

// Mongoose Schema
const supplierMongooseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true,
    },
    contactPerson: {
      type: String,
      required: [true, "Contact person is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /\d{10,}/.test(v.replace(/[^\d]/g, ""));
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    address: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for products from this supplier
supplierMongooseSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "supplierId",
});

// Index for quick searches
supplierMongooseSchema.index({ name: "text", email: "text" });

const Supplier = mongoose.model("Supplier", supplierMongooseSchema);

export default Supplier;
