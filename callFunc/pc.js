const knex = require("../db/knex");

const createPc = async (req, res) => {
  try {
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
    });
    res.status(201).json("created player Character");
  } catch {
    res.status(500).json("something went wrong");
  }
};

const getPc = async (req, res) => {
  try {
    const pcObj = await knex.select("*").from("pc");
    res.status(201).json(pcObj);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const editPc = async (req, res) => {
  try {
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
    await knex("pc").where("name", "=", req.query["name"]).update({
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
  } catch {
    res.status(500).json("something went wrong");
  }
};

const deletePc = async (req, res) => {
  try {
    await knex("pc")
      .where("id", "=", req.query["id"])
      .delete([
        "name",
        "player_class",
        "race",
        "level",
        "max_hp",
        "dex",
        "int",
        "cha",
        "str",
        "con",
        "wis",
      ]);
    res.status(201).json("player deleted");
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
