//how to use express web framework
const express = require('express');
const app = express();

//define route, http method for the request
app.get('/', (req, res) => {
  res
    .status(404)
    .json({ message: 'Hello from the server side 😀', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post in this endpoint...');
});

//listen the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
