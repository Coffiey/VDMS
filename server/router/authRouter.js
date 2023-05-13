const express = require("express");
const {
  createPc,
  getPc,
  createMonsterDB,
  getMonsterDB,
} = require("../../callFunc/serverF");

const router = express.Router();
router.route("/pc").get(getPc).post(createPc);
router.route("/enemy").get(getMonsterDB).post(createMonsterDB);

module.exports = router;
