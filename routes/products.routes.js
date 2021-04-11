const express = require('express');
const router = express.Router();

const ProductControlles = require('../controllers/products.controller');

router.get('/products', ProductControlles.getAll);
router.get('/products/random', ProductControlles.getRandom);
router.get('/products/:id', ProductControlles.getById);
router.post('/products', ProductControlles.postNew);
router.put('/products/:id', ProductControlles.modifyById);
router.delete('/products/:id', ProductControlles.deleteById);

module.exports = router;