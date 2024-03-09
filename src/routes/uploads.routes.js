const { Router } = require('express');
const UploadController = require('../controllers/UploadController');

const uploadRoutes = Router();

uploadRoutes.post('/', UploadController.UploadFiles);

module.exports = uploadRoutes;
