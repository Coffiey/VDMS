const express = require("express");
const {
  createUser,
  getUserByUsername,
} = require("../../callFunc/authentication");

const router = express.Router();
router.route("/user").get(getUserByUsername).post(createUser);

module.exports = router;
