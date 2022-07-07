"use strict";
const path = require("path");
const Bus = require(path.join(__dirname, "..", "model", "Bus"));
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "utils", "AppErr"));

exports.addBus = catchAsync(async function (req, res, next) {
  const doc = await Bus.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      document,
    },
  });
});
