const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//created checkId middleware
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};
//created checkBody middleware for post request
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    //400: Bad request
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};
// ROUTE HANDLERS
exports.getAllTours = (req, res) => {
  res.status(200).json({
    //and formatted our response using JSend specification
    status: 'success',
    result: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      //status 201 means created and 200 stands for OK
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
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