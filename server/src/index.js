import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import reportRoutes from "./routes/reports.routes.js";

const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/pharmacy_inventory";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // Logging

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/reports", reportRoutes);

// Error handling
app.use(errorHandler);

// Handle undefined routes
app.use("*", (req, res) => {
  res.status(404).json({ error: "Resource not found" });
});

// Database connection
try {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("MongoDB connection error:", error);
  process.exit(1);
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});
