import mongoose from "mongoose";
import { AuthError } from "./auth.middleware.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Handle authentication errors
  if (err instanceof AuthError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Handle validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
    return res.status(400).json({ errors });
  }

  // Handle duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      error: `${field} already exists`,
    });
  }

  // Handle cast errors (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      error: `Invalid ${err.path}: ${err.value}`,
    });
  }

  // Default error
  res.status(500).json({
    error: "Internal Server Error",
  });
};
