import prisma from "../utils/prisma.js";
import { ApiError } from "../utils/ApiError.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        sku: req.body.sku,
        category: req.body.category,
        quantity: parseInt(req.body.quantity),
        minStockLevel: parseInt(req.body.minStockLevel),
        price: parseFloat(req.body.price),
        expiryDate: new Date(req.body.expiryDate),
        description: req.body.description,
        supplierId: parseInt(req.body.supplierId),
      },
      include: {
        supplier: true,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    if (error.code === "P2002") {
      next(new ApiError(400, "SKU must be unique"));
    } else {
      next(error);
    }
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;
    const skip = (page - 1) * Number(limit);

    // Build where clause
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { sku: { contains: search, mode: "insensitive" } },
      ];
    }
    if (category) {
      where.category = category;
    }

    // Get products with pagination
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: "desc" },
        include: {
          supplier: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        supplier: true,
      },
    });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name: req.body.name,
        sku: req.body.sku,
        category: req.body.category,
        quantity: parseInt(req.body.quantity),
        minStockLevel: parseInt(req.body.minStockLevel),
        price: parseFloat(req.body.price),
        expiryDate: new Date(req.body.expiryDate),
        description: req.body.description,
        supplierId: parseInt(req.body.supplierId),
      },
      include: {
        supplier: true,
      },
    });

    res.json(product);
  } catch (error) {
    if (error.code === "P2025") {
      next(new ApiError(404, "Product not found"));
    } else if (error.code === "P2002") {
      next(new ApiError(400, "SKU must be unique"));
    } else {
      next(error);
    }
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await prisma.product.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      next(new ApiError(404, "Product not found"));
    } else {
      next(error);
    }
  }
};

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
