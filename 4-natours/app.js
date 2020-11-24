//how to use express web framework
const fs = require('fs');
const express = require('express');

const app = express();

//for creating middleware
//And middleware is basically a function that can modify the incoming request data.
//It's called middleware because it stands between,
//so in the middle of the request and the response.
app.use(express.json());

//define route, http method for the request
/*
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side 😀', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post in this endpoint...');
});

 */

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//implement the tours route and handling  GET method, and create a route handler function
//what do we want to do when someone hits this route?
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    //and formatted our response using JSend specification
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

//how to defining parameters right in the URL,how to then read these parameters,
//and also, how to respond to them
//How to get only one tour
app.get('/api/v1/tours/:id', (req, res) => {
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
});

//implement a route handler for POST requests so that we can actually add a new tour to our data set.
app.post('/api/v1/tours', (req, res) => {
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
  //res.send('Done!');
});

//how to handle PATCH request // update data
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ...>'
    }
  })
})

//listen the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
