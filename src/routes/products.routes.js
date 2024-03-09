const { Router } = require('express');
const ProductController = require('../controllers/ProductController');

const productsRoutes = Router();

productsRoutes.get('/', ProductController.getAllProducts);
productsRoutes.get('/:nf', ProductController.getProductsByNf);

module.exports = productsRoutes;