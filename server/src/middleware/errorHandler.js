const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      details: Object.values(err.errors).map((error) => ({
        field: error.path,
        message: error.message,
      })),
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      error: "Duplicate Error",
      message: "A record with that unique field already exists",
    });
  }

  // JWT authentication error
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Authentication Error",
      message: "Invalid token",
    });
  }

  // Default error
  res.status(500).json({
    error: "Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "An unexpected error occurred",
  });
};

module.exports = { errorHandler };
