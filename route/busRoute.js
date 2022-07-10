"use strict";
// CORE MODULES
const express = require("express");

// THIRD PARTY MODULES
const path = require("path");

// MY OWN MODULES
const router = express.Router();
const busController = require(path.join(__dirname, "..", "controller", "busController"));
const userController = require(path.join(__dirname, "..", "controller", "userController"));
const reviewRouter = require(path.join(__dirname, "reviewRoute"));
router.get("/getAll", busController.getAll);
router.post("/getCityBusAPI", busController.getCityBusAPI);

router.use("/:busID/reviews", reviewRouter);

router.use(userController.isLoggedIn);
router.use(userController.authorizeUser);
router.post("/addBus", busController.addBus);
router.patch("/updateBus/:busID", busController.updateBus);
router.delete("/deleteBus/:busID", busController.deleteBus);

module.exports = router;
