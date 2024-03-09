const express = require('express');
const cors = require('cors');
const danfesRoutes = require('../routes/danfes.routes');
const tripsRoutes = require('../routes/trips.routes');
const driversRoutes = require('../routes/drivers.routes');
const carsRoutes = require('../routes/cars.routes');
const productsRoutes = require('../routes/products.routes');
const uploadsRoutes = require('../routes/uploads.routes');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: false,
  exposedHeaders: ['Authorization'], // Adicione cabeçalhos personalizados, se necessário
}));

// app.use('/puppeteer', puppeteerScript);

app.use('/danfes', danfesRoutes);
app.use('/trips', tripsRoutes);
app.use('/drivers', driversRoutes);
app.use('/cars', carsRoutes);
app.use('/products', productsRoutes);
app.use('/upload', uploadsRoutes);

module.exports = app;
