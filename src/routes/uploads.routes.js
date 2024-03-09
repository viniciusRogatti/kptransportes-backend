const { Router } = require('express');
const multer = require('multer');
const UploadController = require('../controllers/UploadController');

const uploadRoutes = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

uploadRoutes.post('/', upload.array('files', 5), UploadController.UploadFiles);

module.exports = uploadRoutes;
