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

//create schema for describing tour data
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  rating: {
    type: Number,
    default: 4.7,
  },
});

//create model for that schema
const Tour = mongoose.model('Tour', tourSchema);

//START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
