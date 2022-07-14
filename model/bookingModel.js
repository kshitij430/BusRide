const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  bus: {
    type: mongoose.Schema.ObjectId,
    ref: "Bus",
    required: [true, "Each Booking Should Have a Bus."],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Each Booking Should Have a user."],
  },
  seats: {
    type: [String],
    required: true,
  },
  busDepartureDate: {
    type: Date,
    required: ["true", "Each Booking Should have a Departure Date"],
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: [true, "Each Booking must have a price."],
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate("bus");
  return next();
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
