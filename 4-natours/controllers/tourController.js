const Tour = require('../models/tourModel');

// ROUTE HANDLERS
exports.getAllTours = async (req, res) => {
  try {
    //console.log(req.query);

    //BUILD QUERY
    //1a) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    //1b) ADVANCED Filtering
    //{ difficulty: 'easy', duration: { $gte: 5}, } ===> must to be
    //{ difficulty: 'easy', duration: { gte: '5' } }===> we get with req.query
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, el => `$${el}`);

    // how to write queries with Mongoose
    let query = Tour.find(JSON.parse(queryStr));
    //#2
    // const query = Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    //2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      //console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      //by default
      query = query.sort('-createdAt');
    }

    //3) field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      //by default excluding
      query = query.select('-__v');
    }

    //EXECUTE THE QUERY
    const tours = await query;

    //SEND RESPONSE
    res.status(200).json({
      //formatted our response using JSend specification
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    //console.log(req.body);
    //1 way
    // const newTour = new Tour({});
    // newTour.save().then().catch();

    //2way
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updateTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        updateTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    //204 status means: no content
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
