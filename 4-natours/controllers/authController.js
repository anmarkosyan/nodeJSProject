const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//====================== sign up user
exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
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

//================= logging users in: based on user exist and password is correct
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

//=============== protect  tours routes ==========
//middleware function
exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //console.log(token);
  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in to get access.', 401)
    );
  }

  //2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //console.log(decoded);

  //3) check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('The user belonging to this token does not longer exist'),
      401
    );
  }

  //4) check if user changed password after the token has issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again', 401)
    );
  }

  //Grant access to protected route
  req.user = freshUser;
  next();
});
