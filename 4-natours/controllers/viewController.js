const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//================ 📌 Get all tours overview ===========
exports.getOverview = catchAsync(async (req, res, next) => {
  //1) get tour data from collection
  const tours = await Tour.find();

  //2)build template within overview.pug
  //3) render thet template using tour data 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

//=============== 📌 Get one Tour ================
exports.getTour = catchAsync(async (req, res, next) => {
  //1) get the data, for the requested tour(includes reviews and guids)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  //error handler
  if (!tour) {
    return next(new AppError('There is no tour with that name!', 404));
  }

  //2) build template within tour.pug
  //3) render that template using data from step 1)
  res
    .status(200)
    // .set(
    //   'Content-Security-Policy',
    //   "default-src 'self' https://*.mapbox.com https://*.stripe.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    // )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
});

//================ 📌 Get Login ===================
exports.getLoginForm = (req, res) => {
  // 1) build template within login.pug
  // 2) render that template
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('login', {
      title: 'User Login',
    });
};

//============== 📌 Get Sign up ==================
exports.getSignUpForm = (req, res) => {
  //1) build template within signUp.pug
  //2) render that template
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('signup', {
      title: 'Sign Up',
    });
};

//================ 📌 Get Account ====================
exports.getAccount = (req, res) => {
  //1) build template within account.pug
  //2) render that template
  res.status(200).render('account', {
    title: 'Your account',
  });
};

//================= 📌 Get My Tours ==================
exports.getMyTours = catchAsync(async (req, res, next) => {
  //1) find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  //2) find  tours with the returned Ids
  const tourIds = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

//================ 📌 Update User Data ==============
exports.updateUserData = catchAsync(async (req, res, next) => {
  //console.log('Updating data', req, body);
  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updateUser,
  });
});
