const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

//logging users in based on user exist and password is correct
exports.login = catchAsync(async (req, res, next) => {
  //const email = req.body.email  and const password = req.body.password => using object destructuring with ES6
  const { email, password } = req.body;

  // 1) check if email and password exist, if not sent an error message
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) check if the user exists && the password is correct
  const user = await User.findOne({ email }).select('+password');
  //console.log(user)
  //password should be 'gbtrrty1' === '$2a$12$XgfT51zj.JuD7izP0ffGqesCfw8YOsJuttjDHDMpQgJX60wMA0j8.'

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!', 401));
  }

  // 3) if everything ok send token to the client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});
