const validate = (schema) => {
    return (req, res, next) => {
      try {
        const { error } = schema.validate(req.body, {
          abortEarly: false,
          stripUnknown: true
        });
  
        if (error) {
          const errors = error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
          }));
  
          return res.status(400).json({
            error: 'Validation Error',
            details: errors
          });
        }
  
        next();
      } catch (error) {
        next(error);
      }
    };
  };
  
  module.exports = { validate };