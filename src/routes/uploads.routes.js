const { Router } = require('express');
const multer = require('multer');
const UploadController = require('../controllers/UploadController');

const uploadRoutes = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

uploadRoutes.post('/', upload.array('files', 5), UploadController.UploadFiles);

module.exports = uploadRoutes;
