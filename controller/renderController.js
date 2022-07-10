const path = require("path");
const Bus = require(path.join(__dirname, "..", "model", "busModel"));
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "utils", "AppErr"));

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render("login", { subTitle: "Log In" });
});

exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render("signup", { subTitle: "Sign Up" });
});

exports.busTour = catchAsync(async (req, res, next) => {
  // ///////////////////////////////////////////////
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
  res.status(200).render("overview", { subTitle: "Overview" });
});
