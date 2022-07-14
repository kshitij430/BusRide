"use strict";
const path = require("path");
const timeDistance = require(path.join(__dirname, "..", "utils", "timeDistance"));
const mongoose = require("mongoose");
const busSchema = new mongoose.Schema(
  {
    busName: {
      type: String,
      required: [true, "Please Input Valid Bus Name"],
      enum: ["prasanna", "neeta", "kaleswari", "shivshahi", "srs"],
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
      maxlength: 50,
    },
    busDroppingLocation: {
      type: String,
      required: [true, "Please Input Valid Dropping Location, (mumbai city -> santacruz)"],
      minlength: 3,
      maxlength: 50,
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
    busBookedSeats: {
      type: [Array],
    },
    busAmneties: {
      type: [String],
      enum: ["wifi", "charging-station", "video", "bed", "restroom"],
      required: [true, "Please Input Valid Amneties"],
    },
    busPhotos: {
      type: [String],
    },
    busRatingsAverage: {
      type: Number,
    },
    busRatingsQuantity: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "each bus must have an operator"],
    },
  },
  // related to making virtual fields work
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// check for uniqueness
busSchema.index({ busName: 1, busBoardingLocation: 1, busDroppingLocation: 1, busDepartureTime: 1 }, { unique: true });

// VIRTUAL POPULATE
busSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "bus",
  localField: "_id",
});

busSchema.pre("save", async function (next) {
  await timeDistance.saveTimeDistance(this);
  next();
});

const Bus = mongoose.model("Bus", busSchema);
module.exports = Bus;
