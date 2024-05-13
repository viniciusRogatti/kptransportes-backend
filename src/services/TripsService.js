const { Trips, TripNote, Driver, Car  } = require('../database/models');

const createTrip = async (tripData) => {
  let transaction;
  try {
    // Inicia uma transação
    transaction = await Trips.sequelize.transaction();

    // Cria a viagem
    const createdTrip = await Trips.create(tripData, { transaction });

    // Obtém as notas da viagem a partir do corpo da requisição
    const tripNotes = tripData.tripNotes;

    // Cria as notas da viagem associadas à viagem criada
    await Promise.all(
      tripNotes.map(async (note) => {
        await TripNote.create({ trip_id: createdTrip.id, ...note }, { transaction });
      })
    );

    // Comita a transação
    await transaction.commit();

    return createdTrip;
  } catch (error) {
    // Se houver um erro, desfaz a transação
    if (transaction) await transaction.rollback();

    throw error;
  }
};

const searchTripsByDriver = async (driverId) => {
  try {
    const condition = { driver_id: driverId };

    // Consulta no banco de dados
    const trips = await Trips.findAll({
      where: condition,
      include: [
        { model: Driver, attributes: ['id', 'name'] },
        { model: Car, attributes: ['id', 'model', 'license_plate'] },
        {
          model: TripNote,
          attributes: ['id', 'invoice_number', 'status', 'order'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    return trips;
  } catch (error) {
    throw error;
  }
};

const searchTripsByCar = async (carId, date) => {
  try {
    // Consulta no banco de dados
    const trips = await Trips.findAll({
      where: { car_id: carId},
      include: [
        { model: Driver, attributes: ['id', 'name'] },
        { model: Car, attributes: ['id', 'model', 'license_plate'] },
        {
          model: TripNote,
          attributes: ['id', 'invoice_number', 'status', 'order'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    return trips;
  } catch (error) {
    throw error;
  }
};

const searchTripsByNote = async (invoiceNumber) => {
  try {
    // Consulta no banco de dados
    const trips = await Trips.findAll({
      include: [
        { model: Driver, attributes: ['id', 'name'] },
        { model: Car, attributes: ['id', 'model', 'license_plate'] },
        {
          model: TripNote,
          attributes: ['id', 'invoice_number', 'status', 'order'],
          where: { invoice_number: invoiceNumber },
        },
      ],
      order: [['created_at', 'DESC']],
    });

    return trips;
  } catch (error) {
    throw error;
  }
};

const searchTripsByDate = async (date) => {
  try {
    // Consulta no banco de dados
    const trips = await Trips.findAll({
      where: { date },
      include: [
        { model: Driver, attributes: ['id', 'name'] },
        { model: Car, attributes: ['id', 'model', 'license_plate'] },
        {
          model: TripNote,
          attributes: ['id', 'invoice_number', 'status', 'order'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    return trips;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTrip,
  searchTripsByNote,
  searchTripsByCar,
  searchTripsByDriver,
  searchTripsByDate,
};
