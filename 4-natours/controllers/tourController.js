const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// ROUTE HANDLERS
exports.getAllTours = (req, res) => {
  res.status(200).json({
    //and formatted our response using JSend specification
    status: 'success',
    // result: tours.length,
    // requestedAt: req.requestTime,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);
  //
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
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
      message: 'Invalid data sent!',
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  //204 status means: no content
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
