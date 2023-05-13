const express = require("express");
const {
  createUser,
  getUserByUsername,
} = require("../../callFunc/authentication");

const router = express.Router();
router.route("/register").post(createUser);
router.route("/user").post(getUserByUsername);

module.exports = router;
