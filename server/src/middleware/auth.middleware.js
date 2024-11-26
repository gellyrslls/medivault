const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

class AuthError extends Error {
  constructor(message, statusCode = 401) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AuthError';
  }
}

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AuthError('No token provided');
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new AuthError('Token expired');
      }
      throw new AuthError('Invalid token');
    }
    
    // Find user
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      throw new AuthError('User not found');
    }
    
    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Optional: Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AuthError('Authentication required');
    }
    
    if (!roles.includes(req.user.role)) {
      throw new AuthError('Not authorized to access this route', 403);
    }
    
    next();
  };
};

module.exports = {
  auth,
  authorize,
  AuthError
};