"use strict";
const catchAsync = function (asyncFn) {
  return (req, res, next) => {
    // ERRORS WHICH WE ARE NOT HANDLING
    asyncFn(req, res, next).catch((err) => next(err));
  };
};

module.exports = catchAsync;
