const express = require("express");
const logoutController = require("../../Controllers/logoutController");

const router = express.Router();
router.route("/").get(logoutController.logout);

module.exports = router;
