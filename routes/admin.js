const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productController');

router.get('/product',productsController.getProducts);
router.post('/product/store',productsController.storeProduct);
router.put('/product/:id/update',productsController.updateProduct);



module.exports = router;