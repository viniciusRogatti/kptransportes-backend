const { Router } = require('express');
const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/UploadController');

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post('/upload', upload.array('files', 5), uploadController.UploadFiles);

module.exports = router;
