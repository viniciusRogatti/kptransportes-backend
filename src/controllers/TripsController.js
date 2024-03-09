const TripsService = require('../services/TripsService');

const createTrip = async (req, res) => {
  try {
    const tripData = req.body;
    const createdTrip = await TripsService.createTrip(tripData);
    return res.json(createdTrip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar a viagem.' });
  }
};

const editTripStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 
    const updatedTrip = await TripsService.editTripStatus(id, status);
    return res.json(updatedTrip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao editar o status da viagem.' });
  }
};

const addNoteToTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { noteData } = req.body; 
    const updatedTrip = await TripsService.addNoteToTrip(id, noteData);
    return res.json(updatedTrip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao adicionar nota à viagem.' });
  }
};

const removeNoteFromTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { noteId } = req.body; 
    const updatedTrip = await TripsService.removeNoteFromTrip(id, noteId);
    return res.json(updatedTrip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao remover nota da viagem.' });
  }
};

const changeNoteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { noteId, newOrder } = req.body; 
    const updatedTrip = await TripsService.changeNoteOrder(id, noteId, newOrder);
    return res.json(updatedTrip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao alterar a ordem da nota na viagem.' });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    await TripsService.deleteTrip(id);
    return res.json({ message: 'Viagem excluída com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir a viagem.' });
  }
};

const searchTripsByDriver = async (req, res) => {
  try {
    const { driverId } = req.params;
    const { date } = req.query;

    const trips = await TripsService.searchTripsByDriver(driverId, date);

    res.json({ trips });
  } catch (error) {
    console.error('Erro ao buscar viagens por ID do motorista:', error);
    res.status(500).json({ error: 'Erro ao buscar viagens' });
  }
};

const searchTripsByCar = async (req, res) => {
  try {
    const { carId } = req.params;
    console.log(carId);
    const { date } = req.query;

    const trips = await TripsService.searchTripsByCar(carId, date);

    res.json({ trips });
  } catch (error) {
    console.error('Erro ao buscar viagens por ID do veículo:', error);
    res.status(500).json({ error: 'Erro ao buscar viagens' });
  }
};

const searchTripsByNote = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;

    // Chama o serviço para buscar as viagens por NF da nota
    const trips = await TripsService.searchTripsByNote(invoiceNumber);

    // Retorna as viagens encontradas
    return res.json(trips);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const searchTripsByDate = async (req, res) => {
  try {
    const { date } = req.params;

    // Chama o serviço para buscar as viagens por data
    const trips = await TripsService.searchTripsByDate(date);

    // Retorna as viagens encontradas
    return res.json(trips);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar viagens por data.' });
  }
};


module.exports = {
  createTrip,
  editTripStatus,
  addNoteToTrip,
  removeNoteFromTrip,
  changeNoteOrder,
  deleteTrip,
  searchTripsByDriver,
  searchTripsByCar,
  searchTripsByNote,
  searchTripsByDate,
};
