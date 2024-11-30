import { Product } from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";

export const getReports = {
  // Get products with stock below minimum level
  async getLowStock(req, res, next) {
    try {
      const lowStockProducts = await Product.find({
        $expr: { $lt: ["$quantity", "$minStockLevel"] },
      }).populate("supplierId", "name contactPerson email");

      res.json({
        count: lowStockProducts.length,
        products: lowStockProducts,
      });
    } catch (error) {
      next(new ApiError(500, "Error fetching low stock report"));
    }
  },

  // Get current inventory status with various metrics
  async getInventoryStatus(req, res, next) {
    try {
      const [totalProducts, lowStockCount, totalValue, categoryBreakdown] =
        await Promise.all([
          Product.countDocuments(),
          Product.countDocuments({
            $expr: { $lt: ["$quantity", "$minStockLevel"] },
          }),
          Product.aggregate([
            {
              $group: {
                _id: null,
                total: {
                  $sum: { $multiply: ["$quantity", "$price"] },
                },
              },
            },
          ]),
          Product.aggregate([
            {
              $group: {
                _id: "$category",
                count: { $sum: 1 },
                totalValue: {
                  $sum: { $multiply: ["$quantity", "$price"] },
                },
              },
            },
          ]),
        ]);

      res.json({
        totalProducts,
        lowStockCount,
        totalInventoryValue: totalValue[0]?.total || 0,
        categoryBreakdown,
      });
    } catch (error) {
      next(new ApiError(500, "Error fetching inventory status"));
    }
  },

  // Get products expiring within the next 30 days
  async getExpiringSoon(req, res, next) {
    try {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      const expiringSoonProducts = await Product.find({
        expiryDate: {
          $gte: new Date(),
          $lte: thirtyDaysFromNow,
        },
      })
        .populate("supplierId", "name contactPerson email")
        .sort({ expiryDate: 1 });

      res.json({
        count: expiringSoonProducts.length,
        products: expiringSoonProducts,
      });
    } catch (error) {
      next(new ApiError(500, "Error fetching expiring products report"));
    }
  },
};
