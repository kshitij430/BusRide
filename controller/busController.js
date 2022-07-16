"use strict";
const path = require("path");
const Bus = require(path.join(__dirname, "..", "model", "busModel"));
const Booking = require(path.join(__dirname, "..", "model", "bookingModel"));
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "utils", "AppErr"));
const timeDistance = require(path.join(__dirname, "..", "utils", "timeDistance"));
const moment = require("moment");

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

exports.operatorBus = catchAsync(async function (req, res, next) {
  const { id } = req.body;
  const docs = await Bus.find({ user: id }).populate({ path: "reviews" });
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
  docs = docs
    .find({
      $and: [{ busValidFrom: { $lte: new Date(date) } }, { busValidTo: { $gte: new Date(date) } }],
    })
    .populate({ path: "reviews" });
  if (new Date(date).getDate() === new Date().getDate()) {
    docs = docs.find({ busDepartureTime: { $gte: Number(new Date().getHours() + 6) } });
  }
  docs = await docs;
  console.log(new Date(Number(new Date().getHours() + 6)));
  // TODO: give proper error for no results found
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
  // date in req.body will show prev date but if you check .getDate() on it is shows current date
  let { busDepartureCity, busArrivalCity, date, filter } = req.body;
  date = moment(new Date(date)).format("YYYY-MM-DD");
  busDepartureCity = busDepartureCity.toLowerCase();
  busArrivalCity = busArrivalCity.toLowerCase();
  if (!busDepartureCity || !busArrivalCity) return new AppErr("Please Enter Valid From and To Places", 400);
  let docs = Bus.find({
    busDepartureCity,
    busArrivalCity,
  });

  docs = docs
    .find({
      $and: [{ busValidFrom: { $lte: date } }, { busValidTo: { $gte: date } }],
    })
    .populate({ path: "reviews" });
  if (filter?.busTypeArr?.length >= 1) {
    docs = docs.find({ busType: { $in: filter.busTypeArr } });
  }
  if (filter?.busAmnetiesArr?.length >= 1) {
    docs = docs.find({ busAmneties: { $all: filter.busAmnetiesArr } });
  }
  if (filter?.busDepartureArr?.length >= 1) {
    for (const time of filter.busDepartureArr) {
      if (time === "18") {
        docs = docs.find({ busDepartureTime: { $gte: time } });
      }
      if (time === "06") {
        docs = docs.find({ busDepartureTime: { $lte: time } });
      }
      if (time === "06to12") {
        docs = docs.find({ $and: [{ busDepartureTime: { $gte: "06" } }, { busDepartureTime: { $lte: "12" } }] });
      }
      if (time === "12to18") {
        docs = docs.find({ $and: [{ busDepartureTime: { $gte: "12" } }, { busDepartureTime: { $lte: "18" } }] });
      }
    }
  }
  if (new Date(date).getDate() === new Date().getDate()) {
    docs = docs.find({ busDepartureTime: { $gte: new Date().getHours() } });
  }
  docs = await docs;
  res.status(200).json({
    status: "success",
    data: { result: docs.length, docs },
  });
});

exports.getBookedSeats = catchAsync(async function (req, res, next) {
  let { busDepartureDate } = req.query;
  busDepartureDate = moment(new Date(busDepartureDate)).format("YYYY-MM-DD");
  const bus = req.body.busID;
  const docs = await Booking.find({ bus, busDepartureDate });
  res.status(200).json({
    status: "success",
    data: {
      docs,
    },
  });
});
