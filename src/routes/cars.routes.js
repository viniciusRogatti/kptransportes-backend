const { Router } = require('express');
const CarController = require('../controllers/CarController');

const carsRoutes = Router();

carsRoutes.get('/', CarController.getAllCars);
carsRoutes.post('/create', CarController.addCar);


module.exports = carsRoutes;