const { Router } = require('express');
const DriverController = require('../controllers/DriverController');

const driversRoutes = Router();

driversRoutes.get('/', DriverController.getAllDrivers);
driversRoutes.post('/create', DriverController.addDriver);
driversRoutes.delete('/delete/:id', DriverController.removeDriver);

module.exports = driversRoutes;