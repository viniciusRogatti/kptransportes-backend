const { Router } = require('express');
const LoginController = require('../controllers/LoginController');

const loginRoutes = Router();

loginRoutes.post('/', LoginController.login);
loginRoutes.get('/verifyToken', LoginController.verifyToken);

module.exports = loginRoutes;