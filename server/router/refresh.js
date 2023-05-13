const express = require("express");
const { handleRefreshToken } = require("../../callFunc/refreshtoken");

const router = express.Router();
router.route("/").get(handleRefreshToken);

module.exports = router;
