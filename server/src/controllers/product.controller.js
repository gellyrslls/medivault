import Product from "../models/product.model.js";

export const productController = {
  async createProduct(req, res, next) {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  },

  async getProducts(req, res, next) {
    try {
      const { page = 1, limit = 10, search, category } = req.query;
      const query = {};

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { sku: { $regex: search, $options: "i" } },
        ];
      }

      if (category) {
        query.category = category;
      }

      const products = await Product.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .populate("supplierId", "name");

      const total = await Product.countDocuments(query);

      res.json({
        products,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        totalProducts: total,
      });
    } catch (error) {
      next(error);
    }
  },

  async getProduct(req, res, next) {
    try {
      const product = await Product.findById(req.params.id).populate(
        "supplierId",
        "name contactPerson email phone"
      );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).populate("supplierId", "name");

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  async getLowStock(req, res, next) {
    try {
      const products = await Product.find({
        $expr: { $lte: ["$quantity", "$minStockLevel"] },
      }).populate("supplierId", "name");
      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  async getExpiringProducts(req, res, next) {
    try {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      const products = await Product.find({
        expiryDate: {
          $gte: new Date(),
          $lte: thirtyDaysFromNow,
        },
      }).populate("supplierId", "name");

      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  async updateStock(req, res, next) {
    try {
      const { quantity } = req.body;

      if (typeof quantity !== "number") {
        return res.status(400).json({ message: "Quantity must be a number" });
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { $inc: { quantity: quantity } },
        { new: true, runValidators: true }
      ).populate("supplierId", "name");

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      next(error);
    }
  },
};
