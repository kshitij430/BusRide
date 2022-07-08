"use strict";
// CORE MODULES
const express = require("express");

// THIRD PARTY MODULES
const path = require("path");

// MY OWN MODULES
const reviewController = require(path.join(__dirname, "..", "controller", "reviewController"));
const userController = require(path.join(__dirname, "..", "controller", "userController"));
const router = express.Router({ mergeParams: true });

router.get("/getAll", reviewController.getAll);

router.use(userController.isLoggedIn);
router.post("/addReview", reviewController.addReview);

module.exports = router;
