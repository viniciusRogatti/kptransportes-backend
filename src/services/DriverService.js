const { Driver } = require('../database/models');

const getAllDrivers = async () => {
  try {
    const drivers = await Driver.findAll();
    return drivers;
  } catch (error) {
    console.error('Erro ao recuperar motoristas do banco de dados:', error);
    throw error;
  }
};

const addDriver = async (driverData) => {
  try {
    const newDriver = await Driver.create(driverData);
    return newDriver;
  } catch (error) {
    console.error('Erro ao adicionar motorista no banco de dados:', error);
    throw error;
  }
};

const removeDriver = async (driverId) => {
  try {
    const removedDriver = await Driver.destroy({
      where: { id: driverId },
    });
    return removedDriver;
  } catch (error) {
    console.error('Erro ao remover motorista do banco de dados:', error);
    throw error;
  }
};

module.exports = {
  getAllDrivers,
  addDriver,
  removeDriver,
};
