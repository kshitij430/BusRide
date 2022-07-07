"use strict";
const path = require("path");
const timeDistance = require(path.join(__dirname, "..", "utils", "timeDistance"));
const mongoose = require("mongoose");
const BusSchema = new mongoose.Schema({
  busName: {
    type: String,
    required: [true, "Please Input Valid Bus Name"],
    minlength: 3,
    maxlength: 20,
  },
  busType: {
    type: String,
    enum: ["seater", "sleeper", "ac", "nonac"],
    required: [true, "Please Input Valid BusType"],
  },
  busDepartureCity: {
    type: String,
    required: [true, "Please Input Valid Departure City Name"],
    minlength: 3,
    maxlength: 15,
  },
  busArrivalCity: {
    type: String,
    required: [true, "Please Input Valid Arrival City Name"],
    minlength: 3,
    maxlength: 15,
  },
  busDepartureTime: {
    type: String,
    required: [true, "Please Input Valid Departure Time based on 24 hour clock format, (15:10)"],
  },
  busTravelDistance: {
    type: Number,
  },
  busTravelDuration: {
    type: Number,
  },
  busArrivalTime: { type: String },
  busArrivalDate: { type: Date },
  busBoardingLocation: {
    type: String,
    required: [true, "Please Input Valid Boarding Location, (pune city -> Sangamwadi)"],
    minlength: 3,
    maxlength: 20,
  },
  busDroppingLocation: {
    type: String,
    required: [true, "Please Input Valid Dropping Location, (mumbai city -> santacruz)"],
    minlength: 3,
    maxlength: 20,
  },
  busValidFrom: {
    type: Date,
    default: Date.now(),
  },
  busValidTo: {
    type: Date,
    required: [true, "Please Input Valid End Date of Bus"],
  },
  busFare: {
    type: Number,
    required: [true, "Please Input Valid Fare"],
    min: 10,
    max: 10000,
  },
  busSeatsAvailable: {
    // IN FUTURE THIS WILL BE DYNAMIC
    type: Number,
    default: 40,
  },
  busAmneties: {
    type: [String],
    enum: ["wifi", "charging", "movie", "blanket", "wc"],
    required: [true, "Please Input Valid Amneties"],
  },
  busPhotos: {
    type: [String],
  },
});
// check for uniqueness
BusSchema.index({ busName: 1, busBoardingLocation: 1, busDroppingLocation: 1, busDepartureTime: 1 }, { unique: true });

BusSchema.pre("save", async function (next) {
  await timeDistance.saveTimeDistance(this);
  next();
});
const Bus = mongoose.model("Bus", BusSchema);
module.exports = Bus;
