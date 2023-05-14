const knex = require("../db/knex");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const createMonsterDB = async (req, res) => {
  try {
    const { monsterName, health, monsterReference, index, url } = req.body;
    await knex("monster").insert({
      monster_name: monsterName,
      health,
      monster_reference: monsterReference,
      index,
      url,
    });
    res.status(201).json("created monster");
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const getMonsterDB = async (req, res) => {
  try {
    const monster = await knex.select("*").from("monster");
    const monsterObj = await monster.map((item) => {
      return {
        monsterName: item.monster_name,
        health: item.health,
        index: item.index,
        monsterReference: item.monster_reference,
        url: item.url,
      };
    });
    res.status(201).json(monsterObj);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const editMonsterDB = async (req, res) => {
  try {
    const { monsterName, health, monsterReference, index, url } = req.body;
    await knex("monster")
      .where("monster_reference", "=", req.query["monsterReference"])
      .update({
        monster_name: monsterName,
        health,
        monster_reference: monsterReference,
        index,
        url,
      });
    res.status(201).json("monster Updated");
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const deleteMonsterDB = async (req, res) => {
  try {
    await knex("monster")
      .where("monster_reference", "=", req.query["monsterReference"])
      .delete(["monster_name", "health", "monster_reference", "index", "url"]);
    res.status(201).json("Deleted monster");
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
