const express = require("express");
const { createPc, getPc, editPc, deletePc } = require("../../callFunc/pc");
const {
  createMonsterDB,
  getMonsterDB,
  editMonsterDB,
  deleteMonsterDB,
} = require("../../callFunc/monster");
const {
  createEncounters,
  getEncounters,
  editEncounters,
  deleteEncounters,
  getEncounterById,
} = require("../../callFunc/encounters");
const {
  getCampaigns,
  createCampaigns,
  editCampaigns,
  deleteCampaigns,
} = require("../../callFunc/campaigns");

const router = express.Router();
router
  .route("/:user/:campaigns/pc")
  .post(createPc)
  .get(getPc)
  .put(editPc)
  .delete(deletePc);
router
  .route("/:user/:campaigns/:encounters/enemy")
  .post(createMonsterDB)
  .get(getMonsterDB)
  .put(editMonsterDB)
  .delete(deleteMonsterDB);
router.route("/:user/:campaigns/:encounters").get(getEncounterById);
router
  .route("/:user/:campaigns")
  .post(createEncounters)
  .get(getEncounters)
  .put(editEncounters)
  .delete(deleteEncounters);
router
  .route("/:user")
  .post(createCampaigns)
  .get(getCampaigns)
  .put(editCampaigns)
  .delete(deleteCampaigns);

module.exports = router;
