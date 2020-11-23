//how to use express web framework
const fs = require('fs');
const express = require('express');
const app = express();

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

//implement the tours route and handling  GET method, and create a route handler function
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

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

//listen the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
