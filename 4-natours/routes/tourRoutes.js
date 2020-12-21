const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

// ROUTES
// MOUNTING the router
const router = express.Router();

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
    //authController.restrictTo('admin'),
    tourController.deleteTour
  );

module.exports = router;
