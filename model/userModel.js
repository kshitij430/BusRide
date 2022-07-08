"use strict";
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const AppErr = require(path.join(__dirname, "..", "utils", "AppErr"));

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Input valid name"],
    validate: /^[a-zA-Z0-9_ ]*$/,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Input valid email"],
    validate:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: {
    type: String,
    minlength: [4, "Password Should be minimum 4 characters long"],
    required: [true, "Please Input Password"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please verify Password Correctly"],
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
  emailToken: String,
  tokenExpiry: Date,
});

// encrypting password before saving to the db
UserSchema.pre("save", async function (next) {
  // check if the password field is modified
  if (!this.isModified("password") || !this.isNew) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

UserSchema.pre("validate", function (next) {
  if (!this.isNew) return next();
  if (this.password !== this.confirmPassword) return next(new AppErr("Please Validate Password Correctly", 400));
  next();
});

// instance method to decrypt users password
UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// instance method to create a sha256 token for email verification
UserSchema.methods.createValidationToken = function () {
  // 1) generate Token
  const token = crypto.randomBytes(32).toString("hex");

  // 2) save the token to the db in encrypted format
  this.emailToken = crypto.createHash("sha256").update(token).digest("hex");

  // expire the token after 10 minutes
  this.tokenExpiry = Date.now() + 10 * 60 * 1000;

  return token;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
