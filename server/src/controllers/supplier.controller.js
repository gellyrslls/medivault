import prisma from "../utils/prisma.js";
import { ApiError } from "../utils/ApiError.js";

export const createSupplier = async (req, res, next) => {
  try {
    const supplier = await prisma.supplier.create({
      data: {
        name: req.body.name,
        contactPerson: req.body.contactPerson,
        email: req.body.email,
        phone: req.body.phone,
      },
    });

    res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
};

export const getSuppliers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * Number(limit);

    // Build where clause
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { contactPerson: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get suppliers with pagination
    const [suppliers, total] = await Promise.all([
      prisma.supplier.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: "desc" },
        include: {
          products: true,
        },
      }),
      prisma.supplier.count({ where }),
    ]);

    res.json({
      suppliers,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    next(error);
  }
};

export const getSupplier = async (req, res, next) => {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        products: true,
      },
    });

    if (!supplier) {
      throw new ApiError(404, "Supplier not found");
    }

    res.json(supplier);
  } catch (error) {
    next(error);
  }
};

export const updateSupplier = async (req, res, next) => {
  try {
    const supplier = await prisma.supplier.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name: req.body.name,
        contactPerson: req.body.contactPerson,
        email: req.body.email,
        phone: req.body.phone,
      },
      include: {
        products: true,
      },
    });

    res.json(supplier);
  } catch (error) {
    if (error.code === "P2025") {
      next(new ApiError(404, "Supplier not found"));
    } else {
      next(error);
    }
  }
};

export const deleteSupplier = async (req, res, next) => {
  try {
    await prisma.supplier.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      next(new ApiError(404, "Supplier not found"));
    } else if (error.code === "P2003") {
      next(
        new ApiError(400, "Cannot delete supplier with associated products")
      );
    } else {
      next(error);
    }
  }
};
