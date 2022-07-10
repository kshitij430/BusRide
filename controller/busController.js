"use strict";
const path = require("path");
const Bus = require(path.join(__dirname, "..", "model", "busModel"));
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "utils", "AppErr"));
const timeDistance = require(path.join(__dirname, "..", "utils", "timeDistance"));

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
  // TODO: give proper error for empty inputs
  if (!busDepartureCity || !busArrivalCity || !date) {
    return next(new AppErr("Please Enter Valid From and To Places", 400));
  }
  let docs = Bus.find({
    busDepartureCity,
    busArrivalCity,
  });
  docs = await docs
    .find({
      $and: [{ busValidFrom: { $lte: new Date(date) } }, { busValidTo: { $gte: new Date(date) } }],
    })
    .populate({ path: "reviews" });

  // TODO: give proper error for no results found
  if (docs.length === 0) return next(new AppErr("No Results Found", 400));
  req.docs = docs;
  req.searchedDate = date;
  return next();
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

exports.getCityBusAPI = catchAsync(async function (req, res, next) {
  let { busDepartureCity, busArrivalCity, date, filter } = req.body;
  busDepartureCity = busDepartureCity.toLowerCase();
  busArrivalCity = busArrivalCity.toLowerCase();
  if (!busDepartureCity || !busArrivalCity) return new AppErr("Please Enter Valid From and To Places", 400);
  let docs = Bus.find({
    busDepartureCity,
    busArrivalCity,
  });
  docs = docs
    .find({
      $and: [{ busValidFrom: { $lte: new Date(date) } }, { busValidTo: { $gte: new Date(date) } }],
    })
    .populate({ path: "reviews" });
  if (filter?.busTypeArr?.length >= 1) {
    docs.find({ busType: { $in: filter.busTypeArr } });
  }
  if (filter?.busAmnetiesArr?.length >= 1) {
    docs.find({ busAmneties: { $all: filter.busAmnetiesArr } });
  }
  docs = await docs;
  res.status(200).json({
    status: "success",
    data: { result: docs.length, docs },
  });
});
