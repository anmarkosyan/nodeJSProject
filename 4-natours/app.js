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

//listen the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});