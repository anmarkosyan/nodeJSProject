/*
it's a good practice to have everything that is related to express in one file,
and then everything that is related to the server in another main file.
So starting now, server.js will actually be our starting file where everything starts,
and it's there when we listen to our server.
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//catch uncaught exceptions: all bugs,that occur in our synchronous code
//but are not handled anywhere are called uncaught exceptions,
//and should do this before any process is running

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('Uncaught exception 💥: Shutting down...');
  //shut down application
});

dotenv.config({ path: './config.env' });
const app = require('./app');

//console.log(app.get('env'));//to see express environment
//to see all node.js environment
//console.log(process.env);

//how to connect app to the hosted database (to the cloud MongoDB Atlas)
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection'));
//.catch(err => console.log('Error 💥'));

//START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//central place to handle all UNHANDLED PROMISE REJECTIONS,catch  form anywhere in the application
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection 💥: Shutting down...');
  //1:close the server
  server.close(() => {
    //2:shut down application
    process.exit(1);
  });
});
