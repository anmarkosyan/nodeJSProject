//how to use express web framework
const fs = require('fs');
const express = require('express');
const morgan = require('morgan'); // morgan => 3rd party middleware:HTTP request logger middleware for node.js

const app = express();

//1: MIDDLEWARE

//for creating middleware
//And middleware is basically a function that can modify the incoming request data.
//It's called middleware because it stands between,
//so in the middle of the request and the response.
app.use(morgan('dev')); //3rd party middleware, which allows us to see request data right in the console

app.use(express.json());

//========= how to create our own middleware function that we want to add in middleware stack
//and this middleware here applies to each and every single request,
//❗️and it should come before route handler
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

//how to manipulate request object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2: ROUTE HANDLERS
const getAllTours = (req, res) => {
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

const getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  //how to define an error
  //if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  //204 status means: no content
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//👤 users route handler
const getAllUsers = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};
const getUser = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};
const createUser = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};
const updateUser = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};
const deleteUser = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};

//3: ROUTES
//how to MOUNTING the router
const tourRoute = express.Router();
const userRoute = express.Router();

tourRoute.route('/').get(getAllTours).post(createTour);
tourRoute.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

//users route
userRoute.route('/').get(getAllUsers).post(createUser);
userRoute.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
//this is a route middleware
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

//4: START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
