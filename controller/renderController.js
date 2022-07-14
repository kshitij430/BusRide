const path = require("path");
const Bus = require(path.join(__dirname, "..", "model", "busModel"));
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "utils", "AppErr"));
const Booking = require(path.join(__dirname, "..", "model", "bookingModel"));
const moment = require("moment");
exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render("login", { subTitle: "Log In" });
});

exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render("signup", { subTitle: "Sign Up" });
});

exports.busTour = catchAsync(async (req, res, next) => {
  // ///////////////////////////////////////////////
  if (!req.docs.length) return res.status(404).render("error", { subTitle: "Not Found" });
  req.docs.forEach((el) => {
    let userInputedDate = new Date(req.searchedDate);
    let arrivalTime = Number(el.busDepartureTime.split(":")[0]);
    for (let i = 1; i <= Math.round(el.busTravelDuration); i++) {
      if (arrivalTime >= 24) {
        userInputedDate.setDate(userInputedDate.getDate() + 1);
        arrivalTime = 0;
      }
      arrivalTime += 1;
    }
    el.busArrivalDate = userInputedDate;
  });
  // ///////////////////////////////////////////////////
  res.status(200).render("busTour", { subTitle: "Available Tours", buses: req.docs, searchedDate: req.searchedDate });
});

exports.overview = catchAsync(async (req, res, next) => {
  // CREATE BOOKING
  if (Object.keys(req.query).length !== 0) {
    const { bus, user, price, seats } = req.query;
    let { busDepartureDate } = req.query;
    busDepartureDate = moment(new Date(busDepartureDate)).format("YYYY-MM-DD");
    if (!bus || !user || !price || !seats || !busDepartureDate)
      return res.status(404).render("error", { subTitle: "Not Found" });
    const busSeats = await Bus.findOne({ _id: bus });
    await Booking.create({ bus, user, price, seats: seats.split(","), busDepartureDate });
  }
  res.status(200).render("overview", { subTitle: "Overview" });
});

exports.profile = catchAsync(async (req, res, next) => {
  res.status(200).render("profile", { subTitle: "My Profile" });
});

exports.error = catchAsync(async (req, res, next) => {
  res.status(404).render("error", { subTitle: "Not Found" });
});
