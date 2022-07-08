// CORE MODULES
const mongoose = require("mongoose");

// THIRD PARTY MODULES
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "config.env") });

// MY OWN MODULES
const Bus = require(path.join(__dirname, "..", "model", "busModel"));
const Booking = require(path.join(__dirname, "..", "model", "bookingModel"));
const Review = require(path.join(__dirname, "..", "model", "reviewModel"));
const User = require(path.join(__dirname, "..", "model", "userModel"));

// DATABASE CONNECT
const dbUrl =
  `mongodb+srv://kshitijg5:<password>@cluster0.rhnqz.mongodb.net/Bus-Ride?retryWrites=true&w=majority`.replace(
    "<password>",
    process.env.DB_PASSWORD
  );
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DATABASE SUCCESSFULLY CONNECTED!!");
  })
  .catch((err) => {
    console.log(err, "ERROR CONNECTING TO THE DATABASE");
  });

const deleteDb = async function () {
  console.log("DELETING DB!!!!");
  //   add models to be deleted
  await Bus.deleteMany({});
  await Booking.deleteMany({});
  await Review.deleteMany({});
  await User.deleteMany({});
  console.log("DB DELETED!!");
};

// read command to delete or to insert
const cmd = process.argv.slice(-1)[0];
if (cmd === "--delete") {
  deleteDb();
}
