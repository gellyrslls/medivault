const { auth, authorize, AuthError } = require("./auth.middleware");
const { validate } = require("./validate.middleware");
const { errorHandler } = require("./errorHandler");

module.exports = {
  auth,
  authorize,
  validate,
  errorHandler,
  AuthError,
};
