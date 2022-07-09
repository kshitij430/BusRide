"use strict";
const globalErrorHandler = function (err, req, res, next) {
  if (err) {
    console.log("GLOBAL ERROR HANDLER HIT!");
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = globalErrorHandler;
