const express = require("express");
const refreshtokenController = require("../../Controllers/refreshtokenController");

const router = express.Router();
router.route("/").get(refreshtokenController.handleRefreshToken);

module.exports = router;
