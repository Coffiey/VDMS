const express = require("express");
const pcController = require("../../Controllers/pcController");
const monsterController = require("../../Controllers/monsterController");
const encountersController = require("../../Controllers/encountersController");
const campaignsController = require("../../Controllers/campaignsController");

const router = express.Router();
router.route("/:user/campaigns").get(campaignsController.getCampaignById);
router
  .route("/:user/:campaigns/pc")
  .post(pcController.createPc)
  .get(pcController.getPc)
  .put(pcController.editPc)
  .delete(pcController.deletePc);
router
  .route("/:user/:campaigns/:encounters/enemy")
  .post(monsterController.createMonsterDB)
  .get(monsterController.getMonsterDB)
  .put(monsterController.editMonsterDB)
  .delete(monsterController.deleteMonsterDB);
router
  .route("/:user/:campaigns/:encounters")
  .get(encountersController.getEncounterById);
router
  .route("/:user/:campaigns")
  .post(encountersController.createEncounters)
  .get(encountersController.getEncounters)
  .put(encountersController.editEncounters)
  .delete(encountersController.deleteEncounters);
router
  .route("/:user")
  .post(campaignsController.createCampaigns)
  .get(campaignsController.getCampaigns)
  .put(campaignsController.editCampaigns)
  .delete(campaignsController.deleteCampaigns);

module.exports = router;
