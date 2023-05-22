const knex = require("../db/knex");

const verifyCampaign = async (user, id) => {
  const campaign = await knex
    .select("*")
    .from("campaigns")
    .where({
      user_id: user,
      id: id,
    })
    .first();
  return campaign;
};

const createEncounters = async (req, res) => {
  try {
    const { encounterName, notes } = req.body;
    const verify = await verifyCampaign(
      req.params["user"],
      req.params["campaigns"]
    );

    if (verify) {
      await knex("encounters").insert({
        campaigns_id: req.params["campaigns"],
        encounter_name: encounterName,
        notes,
      });
      res.status(201).json("created encounter");
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const getEncounters = async (req, res) => {
  try {
    const verify = await verifyCampaign(
      req.params["user"],
      req.params["campaigns"]
    );

    if (verify) {
      const encounter = await knex.select("*").from("encounters").where({
        campaigns_id: req.params["campaigns"],
      });
      const encounterObj = await encounter.map((item) => {
        return {
          id: item.id,
          campaignId: item.campaigns_id,
          encounterName: item.encounter_name,
          notes: item.notes,
        };
      });
      res.status(201).json(encounterObj);
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const getEncounterById = async (req, res) => {
  try {
    const verify = await verifyCampaign(
      req.params["user"],
      req.params["campaigns"]
    );

    if (verify) {
      const encounter = await knex
        .select("*")
        .from("encounters")
        .where({
          id: req.params["encounters"],
          campaigns_id: req.params["campaigns"],
        })
        .first();
      const encounterObj = {
        id: encounter.id,
        campaignId: encounter.campaigns_id,
        encounterName: encounter.encounter_name,
        notes: encounter.notes,
      };
      res.status(201).json(encounterObj);
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const editEncounters = async (req, res) => {
  try {
    const verify = await verifyCampaign(
      req.params["user"],
      req.params["campaigns"]
    );

    if (verify) {
      const { encounterName, notes } = req.body;
      await knex("encounters")
        .where({
          campaigns_id: req.params["campaigns"],
          id: req.query["id"],
        })
        .update({
          encounter_name: encounterName,
          notes,
        });
      res.status(201).json("encounters Updated");
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const deleteEncounters = async (req, res) => {
  try {
    const verify = await verifyCampaign(
      req.params["user"],
      req.params["campaigns"]
    );

    if (verify) {
      await knex("encounters").where({ id: req.query["id"] }).del();
      res.status(201).json("Deleted encounters");
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

module.exports = {
  createEncounters,
  getEncounters,
  editEncounters,
  deleteEncounters,
  getEncounterById,
};
