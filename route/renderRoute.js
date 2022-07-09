const express = require("express");
const router = express.Router();
const path = require("path");

const renderController = require(path.join(__dirname, "..", "controller", "renderController"));
const userController = require(path.join(__dirname, "..", "controller", "userController"));
const busController = require(path.join(__dirname, "..", "controller", "busController.js"));

router.use(userController.isLoggedIn);
router.get("/", renderController.overview);
router.get("/login", renderController.login);
router.get("/signup", renderController.signup);
router.post("/busTour", busController.getCityBus, renderController.busTour);

module.exports = router;
