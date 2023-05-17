const express = require("express");
const apiController = require("../../Controllers/apiController");

const router = express.Router();
router.route("/monster").get(apiController.getMonsterList);
router.route("/races").get(apiController.getRaceList);
router.route("/classes").get(apiController.getClassList);
router.route("/monster/object").get(apiController.getMonsterByurl);

module.exports = router;
