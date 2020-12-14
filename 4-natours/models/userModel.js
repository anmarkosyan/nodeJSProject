const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    required: [true, 'Please tell us your name!'],
    type: String,
    unique: true,
    trim: true,
    maxlength: [20, 'A name must have less or equal 20 characters'],
    minlength: [5, 'A name must have more or equal 5 characters'],
  },
  email: {
    required: [true, 'Please provide your email!'],
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    required: [true, 'Please provide a password!'],
    type: String,
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
