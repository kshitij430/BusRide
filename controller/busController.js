"use strict";
const path = require("path");
const Bus = require(path.join(__dirname, "..", "model", "busModel"));
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "utils", "AppErr"));

exports.addBus = catchAsync(async function (req, res, next) {
  const doc = await Bus.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.getAll = catchAsync(async function (req, res, next) {
  const docs = await Bus.find({}).populate({ path: "reviews" });
  res.status(200).json({
    status: "success",
    data: {
      result: docs.length,
      docs,
    },
  });
});

exports.getCityBus = catchAsync(async function (req, res, next) {
  let { busDepartureCity, busArrivalCity, date } = req.body;
  busDepartureCity = busDepartureCity.toLowerCase();
  busArrivalCity = busArrivalCity.toLowerCase();
  if (!busDepartureCity || !busArrivalCity) return new AppErr("Please Enter Valid From and To Places", 400);
  let docs = Bus.find({
    busDepartureCity,
    busArrivalCity,
  });
  docs = await docs
    .find({
      $and: [{ busValidFrom: { $lte: new Date(date) } }, { busValidTo: { $gte: new Date(date) } }],
    })
    .populate({ path: "reviews" });
  res.status(200).json({
    status: "success",
    data: {
      result: docs.length,
      docs,
    },
  });
});

exports.updateBus = catchAsync(async function (req, res, next) {
  const { busID } = req.params;
  const doc = await Bus.findByIdAndUpdate(busID, req.body, { new: true, runValidators: true });
  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.deleteBus = catchAsync(async function (req, res, next) {
  const { busID } = req.params;
  const doc = await Bus.findByIdAndDelete({ _id: busID });
  res.status(204).json({
    status: "succeess",
    data: { doc },
  });
});
