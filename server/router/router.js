const express = require("express");
const {
  getMonsterList,
  getMonsterByurl,
  getMonsterByIndex,
  getRaceList,
  getClassList,
  createPc,
  getPc,
  createMonsterDB,
  getMonsterDB,
} = require("../../callFunc/serverF");

const { createUser } = require("../../callFunc/register");

const { getUserByUsername } = require("../../callFunc/authentication");

const verifyJWT = require("../../middleware/verifyJWT");

const router = express.Router();
router.route("/api/user").get(getUserByUsername).post(createUser);
router.route("/api/pc").post(createPc).get(getPc);
router.route("/api/enemy").post(createMonsterDB).get(getMonsterDB);
router.route("/api/monster").get(getMonsterList);
router.route("/api/races").get(getRaceList);
router.route("/api/classes").get(getClassList);
router.route("/api/monster/object").get(getMonsterByurl);

module.exports = router;
