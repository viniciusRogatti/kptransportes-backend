const { Car } = require('../database/models');

const getAllCars = async () => {
  try {
    const cars = await Car.findAll();
    return cars;
  } catch (error) {
    console.error('Erro ao recuperar carros do banco de dados:', error);
    throw error;
  }
};

const addCar = async (carData) => {
  try {
    const newCar = await Car.create(carData);
    return newCar;
  } catch (error) {
    console.error('Erro ao adicionar carro no banco de dados:', error);
    throw error;
  }
};

const removeCar = async (carId) => {
  try {
    const removedCar = await Car.destroy({
      where: { id: carId },
    });
    return removedCar;
  } catch (error) {
    console.error('Erro ao remover carro do banco de dados:', error);
    throw error;
  }
};

module.exports = {
  getAllCars,
  addCar,
  removeCar,
};
