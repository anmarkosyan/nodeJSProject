const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');

const catchAsync = require('../utils/catchAsync');

//================ 📌 Get all tours overview ===========
exports.getOverview = catchAsync(async (req, res, next) => {
  //1) get tour data from collection
  const tours = await Tour.find();

  //2)build template within overview.pug
  //3) render thet template using tour data 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

//=============== 📌 Get one Tour ================
exports.getTour = catchAsync(async (req, res, next) => {
  //1) get the data, for the requested tour(includes reviews and guids)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  //2) build template within tour.pug
  //3) render that template using data from step 1)
  res.status(200).render('tour', {
    title: 'The forest hiker',
    tour,
  });
});
