const express = require('express');
const tourController = require('./../controllers/tourController');

// ROUTES
// MOUNTING the router
const router = express.Router();

//using param middleware: So param middleware is middleware that only runs
//for certain parameters, so basically, when we have a certain parameter in our URL.
router.param('id', tourController.checkID);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
