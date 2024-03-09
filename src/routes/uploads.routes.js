const { Router } = require('express');
const UploadController = require('../controllers/UploadController')

const uploadRoutes = Router();

uploadRoutes.post('/upload', UploadController.UploadFiles);

module.exports = uploadRoutes;
