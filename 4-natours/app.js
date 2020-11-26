//how to use express web framework
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//1: MIDDLEWARE

//for creating middleware
//And middleware is basically a function that can modify the incoming request data.
//It's called middleware because it stands between,
//so in the middle of the request and the response.
app.use(morgan('dev'));//can use also tiny
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
  console.log(req.params);
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

//3: ROUTES
//app.get('/api/v1/tours', getAllTours);
//app.get('/api/v1/tours/:id', getTour);
//app.post('/api/v1/tours', createTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);

//do better
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//4: START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
