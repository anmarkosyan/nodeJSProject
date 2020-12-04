const mongoose = require('mongoose');

// create schema for describing tour data
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
    default: 4.5,
  },
});

// create model for that schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
