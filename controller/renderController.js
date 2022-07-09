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
  console.log("MY BUSES", req.docs);
  // if (buses.length === 0) return console.log("NO RESULTS FOUND!!");
  res.status(200).render("busTour", { subTitle: "Available Tours", buses: req.docs });
});

exports.overview = catchAsync(async (req, res, next) => {
  console.log(req.body);
  res.status(200).render("overview", { subTitle: "Overview" });
});
