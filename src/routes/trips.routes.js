const { Router } = require('express');
const TripsController = require('../controllers/TripsController');

const tripsRoutes = Router();

tripsRoutes.post('/create', TripsController.createTrip);
tripsRoutes.delete('/delete/:id', TripsController.deleteTrip);

tripsRoutes.get('/search/driver/:driverId', TripsController.searchTripsByDriver);
tripsRoutes.get('/search/car/:carId', TripsController.searchTripsByCar);
tripsRoutes.get('/search/note/:invoiceNumber', TripsController.searchTripsByNote);
tripsRoutes.get('/search/date/:date', TripsController.searchTripsByDate);

tripsRoutes.put('/edit-status/:id', TripsController.editTripStatus);
tripsRoutes.put('/add-note/:id', TripsController.addNoteToTrip);
tripsRoutes.put('/remove-note/:id', TripsController.removeNoteFromTrip);
tripsRoutes.put('/change-order/:id', TripsController.changeNoteOrder);

module.exports = tripsRoutes;
