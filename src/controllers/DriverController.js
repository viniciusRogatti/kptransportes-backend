const DriverService = require('../services/DriverService');

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await DriverService.getAllDrivers();
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao recuperar motoristas do banco de dados.' });
  }
};

const addDriver = async (req, res) => {
  try {
    const newDriver = await DriverService.addDriver(req.body);
    res.json(newDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar motorista no banco de dados.' });
  }
};

const removeDriver = async (req, res) => {
  
  const driverId = req.params.id;
  console.log(driverId);
  try {
    const removedDriver = await DriverService.removeDriver(driverId);
    res.json(removedDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao remover motorista do banco de dados.' });
  }
};

module.exports = {
  getAllDrivers,
  addDriver,
  removeDriver
}
