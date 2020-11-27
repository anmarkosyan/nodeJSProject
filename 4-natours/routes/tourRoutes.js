const express = require('express');
const tourController = require('./../controllers/tourController')



// ROUTES
// MOUNTING the router
const router = express.Router();

router.route('/').get(tourController.getAllTours).post(tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;
