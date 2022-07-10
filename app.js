// CORE MODULES
const express = require("express");

// THIRD PARTY MODULES
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// MY OWN MODULES
const app = express();

const globalErrorHandler = require(path.join(__dirname, "utils", "globalErrorHandler"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.moment = require("moment");

// parse application/json
app.use(bodyParser.json());

// parse cookie into req object
app.use(cookieParser());

// server all static files in public folder
app.use(express.static("public"));

// MINI ROUTERS
const busRoute = require(path.join(__dirname, "route", "busRoute.js"));
const userRoute = require(path.join(__dirname, "route", "userRoute.js"));
const bookingRoute = require(path.join(__dirname, "route", "bookingRoute.js"));
const renderRoute = require(path.join(__dirname, "route", "renderRoute.js"));

//MOUNTING ROUTER
app.use("/", renderRoute);
app.use("/api/v1/bus", busRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/booking", bookingRoute);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
