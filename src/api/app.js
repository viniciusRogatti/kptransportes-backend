const express = require('express');
const cors = require('cors');
const danfesRoutes = require('../routes/danfes.routes');
const tripsRoutes = require('../routes/trips.routes');
const driversRoutes = require('../routes/drivers.routes');
const carsRoutes = require('../routes/cars.routes');
const productsRoutes = require('../routes/products.routes');
const uploadsRoutes = require('../routes/uploads.routes');
const loginRoutes = require('../routes/login.routes');

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['https://viniciusrogatti.github.io', 'http://localhost:3000', 'http://localhost:8081', 'exp://192.168.1.93:8081'],
  credentials: false,
  exposedHeaders: ['Authorization'],
}));

app.use('/danfes', danfesRoutes);
app.use('/trips', tripsRoutes);
app.use('/drivers', driversRoutes);
app.use('/cars', carsRoutes);
app.use('/products', productsRoutes);
app.use('/upload', uploadsRoutes);
app.use('/login', loginRoutes);

module.exports = app;
