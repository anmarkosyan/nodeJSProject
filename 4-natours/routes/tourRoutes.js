const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

// ROUTES
// MOUNTING the router
const router = express.Router();

//❗️how to work with nested routes
// POST /tours/123asd35/reviews
// GET /tours/123asd35/review

router.use('/:tourId/reviews', reviewRouter);

//using param middleware: So param middleware is middleware that only runs
//for certain parameters, so basically, when we have a certain parameter in our URL.
//router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guid'),
    tourController.deleteTour
  );

module.exports = router;
