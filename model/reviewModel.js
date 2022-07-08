const mongoose = require("mongoose");
const path = require("path");
const Bus = require(path.join(__dirname, "busModel"));

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "review cannot be empty"],
    },
    rating: {
      type: Number,
      required: [true, "rating cannot be empty"],
      min: [1, "rating cannot be below 1"],
      max: [5, "rating cannot be above 5"],
    },
    createdAt: {
      type: Date,
      default: new Date(Date.now()),
    },
    bus: {
      type: mongoose.Schema.ObjectId,
      ref: "Bus",
      required: [true, "each review must have a Bus"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "each review must have a user"],
    },
  },
  // related to making virtual fields work
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// static method on Review model to give us avg rating and total raters
reviewSchema.statics.calcAverageRatings = async function (busId) {
  const [reviews] = await this.aggregate([
    {
      $match: { bus: busId },
    },
    {
      $group: {
        _id: "$bus",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await Bus.findByIdAndUpdate(
    { _id: busId },
    {
      busRatingsAverage: Number(reviews.avgRating).toFixed(2),
      busRatingsQuantity: reviews.nRating,
    }
  );
};

reviewSchema.index({ bus: 1, user: 1 }, { unique: true });

reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRatings(this.bus);
});

reviewSchema.post(/^findOneAnd/, async function (doc) {
  await doc.constructor.calcAverageRatings(doc.bus);
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
