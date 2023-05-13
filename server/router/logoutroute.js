const express = require("express");
const { logout } = require("../../callFunc/logout");

const router = express.Router();
router.route("/").get(logout);

module.exports = router;
