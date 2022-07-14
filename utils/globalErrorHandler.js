"use strict";
const path = require("path");
const error = path.join(__dirname, "..", "controller", "renderController.js");
const globalErrorHandler = function (err, req, res, next) {
  if (err) {
    console.log("GLOBAL ERROR HANDLER HIT!");
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = globalErrorHandler;
