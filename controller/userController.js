"use strict";
const path = require("path");
const User = require(path.join(__dirname, "..", "model", "userModel"));
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const Email = require(path.join(__dirname, "..", "utils", "Email"));
const AppErr = require(path.join(__dirname, "..", "utils", "AppErr"));
const { promisify } = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateToken = function (user, req, res) {
  const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRY * 24 * 3600 * 1000),
    httpOnly: true,
  };
  if (req.secure || req.headers["x-forwarded-proto"] === "https") cookieOptions.secure = true;

  // set and send cookie as response
  res.cookie("jwt", token, cookieOptions);
  return res.status(200).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
};

exports.signup = catchAsync(async function (req, res, next) {
  const doc = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    role: req.body.role,
  });
  // create token
  const token = doc.createValidationToken();
  // save token and expiry time to the document
  await doc.save({ validateModifiedOnly: true });
  const url = `${req.protocol}://${req.get("host")}/api/v1/user/verifyUser/${token}`;
  await new Email(doc, url).send("Please Verify your Email Address");
  res.status(200).json({
    status: "success",
    data: {
      message: "An Email has been sent, Please Verify Your Email Address.",
    },
  });
});

exports.login = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;

  // 1) check if email and password exists in the request
  if (!email || !password) {
    return next(new AppErr("User or Password is incorrect", 401));
  }

  // 2) check if the user exists in the db and get password from db as we have set select:false while querying any user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppErr("User or Password is incorrect", 401));
  }
  // TODO: 3) check if email is verified or not
  if (!user.isEmailVerified) return next(new AppErr("An Email has been sent, Please Verify Email Address", 400));
  // 4) validate password using brypt
  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppErr("User or Password is incorrect", 401));
  }
  generateToken(user, req, res);
});

exports.verifyEmail = catchAsync(async function (req, res, next) {
  // get token from the url paramerter
  const token = req.params.tokenId;

  // encrypt the incoming token
  const encryptedToken = crypto.createHash("sha256").update(token).digest("hex");

  // find user with the encrypted token
  const user = await User.findOne({ emailToken: encryptedToken });
  if (!user) return next(new AppErr("Token Expired"), 401);
  user.isEmailVerified = true;
  user.emailToken = undefined;
  user.tokenExpiry = undefined;
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: "success",
    data: {
      message: "<h1>Email Address has been verified, Please Close The Tab and Login to the application</h1>",
    },
  });
});

// if this is true than we can protect our routes
exports.isLoggedIn = catchAsync(async function (req, res, next) {
  try {
    // to get token from the cookie
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      // return next(new AppErr("Please Login To Continue"), 403);
      return next();
    }
    // 2) verify the jwt token received from the header
    const reconstructedPayload = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

    // 3)check if the user exists in the DB or not
    const user = await User.findOne({ _id: reconstructedPayload._id });
    if (!user) {
      return next();
    }
    req.user = user;
    res.locals.user = user;
    return next();
  } catch (err) {
    return next();
  }
});

exports.logout = catchAsync(async function (req, res) {
  res.cookie("jwt", "loggedOut", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
});

exports.authorizeUser = function (req, res, next) {
  const user = req.user;
  if (user.role === "admin") return next();
  next(new AppErr("User Not Authorized!", 403));
};

exports.test = function (req, res, next) {
  res.status(200).send(req.cookies);
};
