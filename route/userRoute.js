"use strict";
// CORE MODULES
const express = require("express");

// THIRD PARTY MODULES
const path = require("path");

// MY OWN MODULES
const router = express.Router();
const userController = require(path.join(__dirname, "..", "controller", "userController"));

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/verifyUser/:tokenId", userController.verifyEmail);
// TEST ROUTE
router.get("*", userController.isLoggedIn, userController.authorizeUser, userController.test);
module.exports = router;
