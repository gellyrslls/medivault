import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./utils/prisma.js";
import { protect } from "./middleware/auth.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
import businessRoutes from "./routes/business.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middlewares
app.use(cors());
app.use(express.json());

// Public Routes (No authentication required)
app.use("/api/auth", authRoutes);

// Protected Routes (Authentication required)
app.use("/api/business", businessRoutes); // Individual routes are protected in the router
app.use("/api/products", protect, productRoutes);
app.use("/api/suppliers", protect, supplierRoutes);
app.use("/api/reports", protect, reportsRoutes);

// Error Handler (Should be last)
app.use(errorHandler);

// Test database connection before starting server
async function startServer() {
  try {
    // Test Prisma connection
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
