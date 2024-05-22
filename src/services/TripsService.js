const { Trips, TripNote, Driver, Car } = require('../database/models');

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
          as: 'TripNotes',  // Alias adicionado
          attributes: ['id', 'invoice_number', 'customer_name', 'city', 'gross_weight', 'status', 'order'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    return trips;
  } catch (error) {
    throw error;
  }
};

const searchTripsByCar = async (carId) => {
  try {
    // Consulta no banco de dados
    const trips = await Trips.findAll({
      where: { car_id: carId },
      include: [
        { model: Driver, attributes: ['id', 'name'] },
        { model: Car, attributes: ['id', 'model', 'license_plate'] },
        {
          model: TripNote,
          as: 'TripNotes',  // Alias adicionado
          attributes: ['id', 'invoice_number', 'customer_name', 'city', 'gross_weight', 'status', 'order'],
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
          as: 'TripNotes',  // Alias adicionado
          attributes: ['id', 'invoice_number', 'customer_name', 'city', 'gross_weight', 'status', 'order'],
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
          as: 'TripNotes',  // Alias adicionado
          attributes: ['id', 'invoice_number', 'customer_name', 'city', 'gross_weight', 'status', 'order'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    return trips;
  } catch (error) {
    throw error;
  }
};

const editTripStatus = async (tripId, newStatus) => {
  try {
    const [rowsUpdated, [updatedTripNote]] = await TripNote.update(
      { status: newStatus },
      { where: { id: tripId }, returning: true }
    );

    if (rowsUpdated !== 1) {
      throw new Error('Não foi possível atualizar o status da nota da viagem');
    }

    return updatedTripNote;
  } catch (error) {
    throw error;
  }
};

const changeNoteOrder = async (noteId, newOrder) => {
  try {
    // Encontra a nota da viagem que será modificada
    const tripNote = await TripNote.findByPk(noteId);

    // Atualiza a ordem da nota
    tripNote.order = newOrder;

    // Salva a nota com a nova ordem
    await tripNote.save();

    return tripNote;
  } catch (error) {
    throw error;
  }
};

const deleteTrip = async (id) => {
  try {
    // Remove a viagem
    await Trips.destroy({ where: { id } });

    return true; // Retorna true se a exclusão for bem-sucedida
  } catch (error) {
    throw error;
  }
};

const addNoteToTrip = async (id, noteData) => {
  try {
    // Encontra a viagem à qual a nota será adicionada
    const trip = await Trips.findByPk(id);

    // Cria a nova nota da viagem
    const newTripNote = await TripNote.create({ trip_id: id, ...noteData });

    return newTripNote;
  } catch (error) {
    throw error;
  }
};

const searchTripsByPeriod = async (driverId, startDate, endDate) => {
  try {
    const trips = await Trips.findAll({
      where: {
        driver_id: driverId,
        date: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: [
        { model: Driver, attributes: ['id', 'name'] },
        { model: Car, attributes: ['id', 'model', 'license_plate'] },
        {
          model: TripNote,
          as: 'TripNotes',  // Alias adicionado
          attributes: ['id', 'invoice_number', 'customer_name', 'city', 'gross_weight', 'status', 'order'],
        },
      ],
      order: [['date', 'ASC']],
    });
    return trips;
  } catch (error) {
    throw error;
  }
};

const removeNoteFromTrip = async (tripId, noteId) => {
  console.log(`trip id: ${tripId} note id: ${noteId}`);
  try {
    // Inclui TripNote usando o alias correto 'TripNotes'
    const trip = await Trips.findByPk(tripId, { 
      include: { 
        model: TripNote, 
        as: 'TripNotes' 
      }
    });

    if (!trip) {
      throw new Error('Viagem não encontrada');
    }

    // Filtra as notas a serem mantidas
    const updatedNotes = trip.TripNotes.filter(note => note.id !== noteId);

    // Atualiza cada nota com o trip_id correto
    await Promise.all(updatedNotes.map(async (note) => {
      note.trip_id = tripId;
      await note.save();
    }));

    // Atualiza a associação das notas à viagem
    await trip.setTripNotes(updatedNotes);

    return true;
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
  editTripStatus,
  changeNoteOrder,
  deleteTrip,
  addNoteToTrip,
  searchTripsByPeriod,
  removeNoteFromTrip
};
