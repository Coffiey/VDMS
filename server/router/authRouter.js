const express = require("express");
const { createPc, getPc, editPc, deletePc } = require("../../callFunc/pc");

const {
  createMonsterDB,
  getMonsterDB,
  editMonsterDB,
  deleteMonsterDB,
} = require("../../callFunc/monster");

const router = express.Router();
router.route("/pc").post(createPc).get(getPc).put(editPc).delete(deletePc);
router
  .route("/enemy")
  .get(getMonsterDB)
  .post(createMonsterDB)
  .put(editMonsterDB)
  .delete(deleteMonsterDB);

module.exports = router;
