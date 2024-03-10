const { Router } = require('express');
const multer = require('multer');
const UploadController = require('../controllers/UploadController');

const uploadRoutes = Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
    files: 500,
  },
});

uploadRoutes.post('/', upload.array('files', 500), UploadController.uploadFiles);

module.exports = uploadRoutes;
