const express = require('express');
const morgan = require('morgan'); // morgan => 3rd party middleware:HTTP request logger middleware for node.js
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const tourRoute = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//1: 📌 GLOBAL MIDDLEWARE
//Set security HTTP headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP! Please try again in an hour!',
});
app.use('/api', limiter);

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NOSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Serving static files
app.use(express.static(`${__dirname}/public`));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

//2: 📌 ROUTES
//this is a route middleware
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

//if this error handler is worked it's mean that our req/res cycle was not yet finished,
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//3: 📌 Global error handler
app.use(globalErrorHandler);

module.exports = app;
