/*
it's a good practice to have everything that is related to express in one file,
and then everything that is related to the server in another main file.
So starting now, server.js will actually be our starting file where everything starts,
and it's there when we listen to our server.
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
  })
  .then(() => console.log('DB connection'));

//how to connect app to the local database
// mongoose
//   .connect(process.env.DATABASE_LOCAL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log('DB local connection'));

//START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
