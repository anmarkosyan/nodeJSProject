//how to use express web framework
const express = require('express');
const morgan = require('morgan'); // morgan => 3rd party middleware:HTTP request logger middleware for node.js
const tourRoute = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//1: MIDDLEWARE

//for creating middleware
//And middleware is basically a function that can modify the incoming request data.
//It's called middleware because it stands between,
//so in the middle of the request and the response.
//app.use(morgan('dev')); //3rd party logger middleware, which allows us to see request data right in the console

//how to use NODE_ENV variable
//console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

//======= using built-in Express middleware for static files
app.use(express.static(`${__dirname}/public`));

//how to manipulate request object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

//2: ROUTES
//this is a route middleware
app.use('/api/v1/tours', tourRoute); //1 run
app.use('/api/v1/users', userRoute); //2 run

//if this error handler is worked it's mean that our req/res cycle was not yet finished,
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}); //3 run:

//global error handler
app.use(globalErrorHandler);

module.exports = app;
