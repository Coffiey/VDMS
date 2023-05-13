const express = require("express");
const {
  getMonsterList,
  getMonsterByurl,
  getMonsterByIndex,
  getRaceList,
  getClassList,
} = require("../../callFunc/serverF");

const router = express.Router();
router.route("/monster").get(getMonsterList);
router.route("/races").get(getRaceList);
router.route("/classes").get(getClassList);
router.route("/monster/object").get(getMonsterByurl);

module.exports = router;
