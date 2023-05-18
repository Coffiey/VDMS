const knex = require("../db/knex");

const verifyEncounters = async (campaigns, id) => {
  const encounters = await knex
    .select("*")
    .from("encounters")
    .where({
      campaigns_id: campaigns,
      id: id,
    })
    .first();
  return encounters;
};

const createMonsterDB = async (req, res) => {
  try {
    const { monsterName, health, monsterReference, index, url } = req.body;
    const verify = await verifyEncounters(
      req.params["campaigns"],
      req.params["encounters"]
    );
    if (verify) {
      await knex("monster").insert({
        encounters_id: Number(req.params["encounters"]),
        monster_name: monsterName,
        health,
        monster_reference: monsterReference,
        index,
        url,
      });
      res.status(201).json("created monster");
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const getMonsterDB = async (req, res) => {
  try {
    const verify = await verifyEncounters(
      req.params["campaigns"],
      req.params["encounters"]
    );
    if (verify) {
      const monster = await knex.select("*").from("monster").where({
        encounters_id: req.params["encounters"],
      });
      const monsterObj = await monster.map((item) => {
        return {
          id: item.id,
          encountersId: item.encounters_id,
          monsterName: item.monster_name,
          health: item.health,
          index: item.index,
          monsterReference: item.monster_reference,
          url: item.url,
        };
      });
      res.status(201).json(monsterObj);
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const editMonsterDB = async (req, res) => {
  try {
    const verify = await verifyEncounters(
      req.params["campaigns"],
      req.params["encounters"]
    );
    if (verify) {
      const { monsterName, health, monsterReference, index, url } = req.body;
      await knex("monster")
        .where({
          id: req.query["id"],
          encounters_id: req.params["encounters"],
        })
        .update({
          monster_name: monsterName,
          health,
          monster_reference: monsterReference,
          index,
          url,
        });
      res.status(201).json("monster Updated");
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const deleteMonsterDB = async (req, res) => {
  try {
    const verify = await verifyEncounters(
      req.params["campaigns"],
      req.params["encounters"]
    );
    if (verify) {
      await knex("monster")
        .where({ id: req.query["id"], encounters_id: req.params["encounters"] })
        .del();
      res.status(201).json("Deleted monster");
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

module.exports = {
  createMonsterDB,
  getMonsterDB,
  editMonsterDB,
  deleteMonsterDB,
};
