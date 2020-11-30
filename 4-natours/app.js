//how to use express web framework
const express = require('express');
const morgan = require('morgan'); // morgan => 3rd party middleware:HTTP request logger middleware for node.js

const tourRoute = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');

const app = express();

//1: MIDDLEWARE

//for creating middleware
//And middleware is basically a function that can modify the incoming request data.
//It's called middleware because it stands between,
//so in the middle of the request and the response.
app.use(morgan('dev')); //3rd party middleware, which allows us to see request data right in the console
app.use(express.json());

//======= using built-in Express middleware for static files
app.use(express.static(`${__dirname}/public`))

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

//2: ROUTES
//this is a route middleware
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

module.exports = app;
