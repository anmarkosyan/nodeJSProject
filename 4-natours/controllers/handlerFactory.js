const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//================ 📌Delete a document ================
exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    //204 status means: no content
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
