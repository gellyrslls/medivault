const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      details: Object.values(err.errors).map((error) => error.message),
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      error: "Duplicate Key Error",
      details: `Duplicate value for ${Object.keys(err.keyPattern).join(", ")}`,
    });
  }

  // JWT authentication error
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Invalid token",
      details: "Please authenticate with a valid token",
    });
  }

  // JWT token expired error
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token expired",
      details: "Please login again",
    });
  }

  // Default to 500 server error
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = { errorHandler };
