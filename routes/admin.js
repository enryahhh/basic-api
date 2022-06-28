const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productController');

router.get('/product',productsController.getProducts);
router.get('/product/:id/update',productsController.updateProduct);
router.post('/product/store',productsController.storeProduct);



module.exports = router;