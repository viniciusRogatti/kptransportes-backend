const { Router } = require('express');
const DanfesController = require('../controllers/DanfesController');

const danfesRoutes = Router();

danfesRoutes.get('/', DanfesController.getTodayDanfes);

danfesRoutes.get('/nf/:id', DanfesController.getDanfeByNf);

danfesRoutes.get('/barcode/:id', DanfesController.getDanfeByBarcode);

danfesRoutes.get('/date', DanfesController.getDanfesByDate);

danfesRoutes.put('/update-status', DanfesController.updateDanfesStatus);

module.exports = danfesRoutes;
