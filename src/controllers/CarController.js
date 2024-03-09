const CarService = require('../services/CarService');

const getAllCars = async (req, res) => {
  try {
    const cars = await CarService.getAllCars();
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao recuperar carros do banco de dados.' });
  }
};

const addCar = async (req, res) => {
  try {
    const newCar = await CarService.addCar(req.body);
    res.json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar carro no banco de dados.' });
  }
};

const removeCar = async (req, res) => {
  const carId = req.params.id; // Assumindo que o ID do carro está nos parâmetros da requisição
  try {
    const removedCar = await CarService.removeCar(carId);
    res.json(removedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao remover carro do banco de dados.' });
  }
};

module.exports = {
  removeCar,
  addCar,
  getAllCars,
}