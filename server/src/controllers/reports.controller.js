import prisma from "../utils/prisma.js";
import { ApiError } from "../utils/ApiError.js";

const isExpiringSoon = (expiryDate) => {
  const expiryTime = new Date(expiryDate).getTime();
  const now = new Date().getTime();
  const diff = expiryTime - now;
  // Return true only if product expires within 30 days but hasn't expired yet
  return diff > 0 && diff < 1000 * 60 * 60 * 24 * 30; // 30 days
};

const isExpired = (expiryDate) => {
  const expiryTime = new Date(expiryDate).getTime();
  const now = new Date().getTime();
  return expiryTime <= now;
};

export const getLowStockProducts = async (req, res, next) => {
  try {
    const { businessProfile } = req.user;
    if (!businessProfile) {
      throw new ApiError(400, "Business profile not found");
    }

    const products = await prisma.product.findMany({
      where: {
        businessId: businessProfile.id,
        quantity: {
          lte: prisma.product.fields.minStockLevel,
        },
      },
      include: {
        supplier: true,
      },
    });

    const formattedProducts = products.map((product) => ({
      ...product,
      id: Number(product.id),
    }));

    res.json(formattedProducts);
  } catch (error) {
    next(error);
  }
};

export const getInventoryStatus = async (req, res, next) => {
  try {
    const { businessProfile } = req.user;
    if (!businessProfile) {
      throw new ApiError(400, "Business profile not found");
    }

    const products = await prisma.product.findMany({
      where: {
        businessId: businessProfile.id,
      },
      include: {
        supplier: true,
      },
    });

    const lowStock = products.filter(
      (product) => product.quantity <= product.minStockLevel
    );

    // Separate expired and expiring products
    const expiredProducts = products.filter((product) =>
      isExpired(product.expiryDate)
    );

    const expiringProducts = products.filter((product) =>
      isExpiringSoon(product.expiryDate)
    );

    const suppliersCount = await prisma.supplier.count({
      where: {
        businessId: businessProfile.id,
      },
    });

    const totalProducts = products.length;
    const totalValue = products.reduce(
      (sum, product) => sum + product.price.toNumber() * product.quantity,
      0
    );

    res.json({
      totalProducts,
      totalValue,
      lowStockCount: lowStock.length,
      totalSuppliers: suppliersCount,
      expiringCount: expiringProducts.length,
      expiredCount: expiredProducts.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getExpiringProducts = async (req, res, next) => {
  try {
    const { businessProfile } = req.user;
    if (!businessProfile) {
      throw new ApiError(400, "Business profile not found");
    }

    const products = await prisma.product.findMany({
      where: {
        businessId: businessProfile.id,
      },
      include: {
        supplier: true,
      },
      orderBy: {
        expiryDate: "asc",
      },
    });

    // Process all products to include expiry status
    const formattedProducts = products.map((product) => {
      const expiryDate = new Date(product.expiryDate);
      const now = new Date();
      const daysUntilExpiry = Math.ceil(
        (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        ...product,
        id: Number(product.id),
        daysUntilExpiry,
        status: isExpired(product.expiryDate)
          ? "expired"
          : isExpiringSoon(product.expiryDate)
          ? "expiring"
          : "valid",
      };
    });

    // Sort by expiry date and filter out valid products
    const expiryProducts = formattedProducts
      .filter((product) => product.status !== "valid")
      .sort((a, b) => {
        // Sort expired products first, then by days until expiry
        if (a.status === "expired" && b.status !== "expired") return -1;
        if (a.status !== "expired" && b.status === "expired") return 1;
        return a.daysUntilExpiry - b.daysUntilExpiry;
      });

    res.json(expiryProducts);
  } catch (error) {
    next(error);
  }
};

export const getRecentActivities = async (req, res, next) => {
  try {
    const { businessProfile } = req.user;
    if (!businessProfile) {
      throw new ApiError(400, "Business profile not found");
    }

    const activities = await prisma.activity.findMany({
      where: {
        businessId: businessProfile.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5, // Limit to 5 most recent activities
    });

    res.json(activities);
  } catch (error) {
    next(error);
  }
};
