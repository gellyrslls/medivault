import prisma from "../utils/prisma.js";
import { ApiError } from "../utils/ApiError.js";

export const getLowStockProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        quantity: {
          lte: prisma.product.fields.minStockLevel,
        },
      },
      include: {
        supplier: true,
      },
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getInventoryStatus = async (req, res, next) => {
  try {
    const [products, lowStock] = await Promise.all([
      prisma.product.findMany({
        include: {
          supplier: true,
        },
      }),
      prisma.product.findMany({
        where: {
          quantity: {
            lte: prisma.product.fields.minStockLevel,
          },
        },
      }),
    ]);

    const totalProducts = products.length;
    const totalValue = products.reduce(
      (sum, product) => sum + product.price.toNumber() * product.quantity,
      0
    );
    const lowStockCount = lowStock.length;

    res.json({
      totalProducts,
      totalValue,
      lowStockCount,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getExpiringProducts = async (req, res, next) => {
  try {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const products = await prisma.product.findMany({
      where: {
        expiryDate: {
          lte: thirtyDaysFromNow,
          gte: new Date(),
        },
      },
      include: {
        supplier: true,
      },
      orderBy: {
        expiryDate: "asc",
      },
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};
