import { ApiError } from "../utils/ApiError.js";
import Supplier from "../models/supplier.model.js";
import Product from "../models/product.model.js";

export const supplierController = {
  // Create new supplier
  async create(req, res, next) {
    try {
      const supplier = await Supplier.create(req.body);
      res.status(201).json(supplier);
    } catch (error) {
      next(error);
    }
  },

  // Get all suppliers with pagination and search
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search;

      const query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ];
      }

      const [suppliers, total] = await Promise.all([
        Supplier.find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .sort({ createdAt: -1 }),
        Supplier.countDocuments(query),
      ]);

      res.json({
        suppliers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Get supplier by ID with their products
  async getById(req, res, next) {
    try {
      const supplier = await Supplier.findById(req.params.id);
      if (!supplier) {
        throw new ApiError(404, "Supplier not found");
      }

      const products = await Product.find({ supplierId: supplier._id });

      res.json({ supplier, products });
    } catch (error) {
      next(error);
    }
  },

  // Update supplier
  async update(req, res, next) {
    try {
      const supplier = await Supplier.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!supplier) {
        throw new ApiError(404, "Supplier not found");
      }

      res.json(supplier);
    } catch (error) {
      next(error);
    }
  },

  // Delete supplier
  async delete(req, res, next) {
    try {
      const productsCount = await Product.countDocuments({
        supplierId: req.params.id,
      });

      if (productsCount > 0) {
        throw new ApiError(
          400,
          "Cannot delete supplier with associated products. Please reassign or delete products first."
        );
      }

      const supplier = await Supplier.findByIdAndDelete(req.params.id);
      if (!supplier) {
        throw new ApiError(404, "Supplier not found");
      }

      res.json({ message: "Supplier deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};
