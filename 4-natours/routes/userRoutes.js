const express = require('express');

//👤 users route handler
const getAllUsers = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};
const getUser = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};
const createUser = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};
const updateUser = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};
const deleteUser = (req, res) => {
  //500 status: internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined!',
  });
};

//3: ROUTES
// MOUNTING the router
const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
