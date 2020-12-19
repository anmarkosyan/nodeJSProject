const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

//👤 users route handler
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    //formatted our response using JSend specification
    status: 'success',
    result: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};
exports.createUser = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};
exports.updateUser = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};
exports.deleteUser = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};
