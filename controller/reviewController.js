"use strict";
const path = require("path");
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "utils", "AppErr"));
const Review = require(path.join(__dirname, "..", "model", "reviewModel"));

exports.getAll = catchAsync(async function (req, res, next) {
  const busId = req.params.busID;
  const doc = await Review.find({ bus: busId }).populate({ path: "user" });
  res.status(200).json({ status: "success", data: { doc } });
});

exports.addReview = catchAsync(async function (req, res, next) {
  const user = req.user.id;
  const bus = req.params.busID;
  const doc = await Review.create({
    review: req.body.review,
    rating: req.body.rating,
    user,
    bus,
  });
  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});
