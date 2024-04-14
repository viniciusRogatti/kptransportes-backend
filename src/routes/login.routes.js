const { Router } = require('express');
const LoginController = require('../controllers/LoginController');

const loginRoutes = Router();

loginRoutes.post('/', LoginController.login);

module.exports = loginRoutes;