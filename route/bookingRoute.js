const express = require("express");
const router = express.Router();
const path = require("path");
const bookingController = require(path.join(__dirname, "..", "controller", "bookingController"));
const userController = require(path.join(__dirname, "..", "controller", "userController"));

router.use(userController.isLoggedIn);
router.get("/:busID", bookingController.createSession);
router.post("/getBookingDetails", bookingController.getBookingDetails);
module.exports = router;
