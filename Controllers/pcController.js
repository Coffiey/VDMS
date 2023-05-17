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

const createPc = async (req, res) => {
  try {
    const verify = await verifyCampaign(
      req.params["user"],
      req.params["campaigns"]
    );
    if (verify) {
      const {
        name,
        playerClass,
        race,
        level,
        maxHp,
        dex,
        int,
        cha,
        str,
        con,
        wis,
        campaignsId,
      } = req.body;
      await knex("pc").insert({
        name,
        player_class: playerClass,
        race,
        level,
        max_hp: maxHp,
        dex,
        int,
        cha,
        str,
        con,
        wis,
        campaigns_id: campaignsId,
      });
      res.status(201).json("created player Character");
    } else {
      res.status(409).json("User Error");
    }
  } catch {
    res.status(500).json("something went wrong");
  }
};

const getPc = async (req, res) => {
  try {
    const verify = await verifyCampaign(
      req.params["user"],
      req.params["campaigns"]
    );
    if (verify) {
      const pcObj = await knex.select("*").from("pc").where({
        campaigns_id: req.params["campaigns"],
      });
      res.status(201).json(pcObj);
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const editPc = async (req, res) => {
  try {
    const verify = await verifyCampaign(
      req.params["user"],
      req.params["campaigns"]
    );
    if (verify) {
      const {
        name,
        playerClass,
        race,
        level,
        maxHp,
        dex,
        int,
        cha,
        str,
        con,
        wis,
      } = req.body;
      await knex("pc")
        .where({ id: req.query["id"], campaigns_id: req.params["campaigns"] })
        .update({
          name,
          player_class: playerClass,
          race,
          level,
          max_hp: maxHp,
          dex,
          int,
          cha,
          str,
          con,
          wis,
        });
      res.status(201).json("updated player Character");
    } else {
      res.status(409).json("User Error");
    }
  } catch {
    res.status(500).json("something went wrong");
  }
};

const deletePc = async (req, res) => {
  try {
    const verify = await verifyCampaign(
      req.params["user"],
      req.params["campaigns"]
    );
    if (verify) {
      await knex("pc").where({ id: req.query["id"] }).del();
      res.status(201).json("player deleted");
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

module.exports = {
  createPc,
  getPc,
  editPc,
  deletePc,
};
