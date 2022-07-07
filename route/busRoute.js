"use strict";
// CORE MODULES
const express = require("express");

// THIRD PARTY MODULES
const path = require("path");

// MY OWN MODULES
const router = express.Router();
const busController = require(path.join(__dirname, "..", "controller", "busController"));
const userController = require(path.join(__dirname, "..", "controller", "userController"));

router.post("/addBus", userController.isLoggedIn, userController.authorizeUser, busController.addBus);

module.exports = router;
