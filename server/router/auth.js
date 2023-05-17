const express = require("express");
const authenticationController = require("../../Controllers/authenticationController");

const router = express.Router();
router.route("/register").post(authenticationController.createUser);
router.route("/user").post(authenticationController.getUserByUsername);

module.exports = router;
