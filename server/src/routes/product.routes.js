const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { auth, validate } = require('../middleware');
const { productSchema, stockUpdateSchema } = require('../utils/validation-schemas');

// Apply authentication middleware to all routes
router.use(auth);

// Main CRUD routes
router.post('/', validate(productSchema), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', validate(productSchema), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Additional inventory management routes
router.get('/reports/low-stock', productController.getLowStock);
router.get('/reports/expiring', productController.getExpiringProducts);
router.patch('/:id/stock', validate(stockUpdateSchema), productController.updateStock);

module.exports = router;