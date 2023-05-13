const knex = require("../db/knex");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

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

const getPc = async (req, res) => {
  try {
    const pcObj = await knex.select("*").from("pc");
    res.status(201).json(pcObj);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const getMonsterList = async (req, res) => {
  console.log("hello this is a test 🤑");
  try {
    const monsters = await fetch("https://www.dnd5eapi.co/api/monsters")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.results;
      });
    res.status(200).json(monsters);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const getRaceList = async (req, res) => {
  try {
    const races = await fetch("https://www.dnd5eapi.co/api/races")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.results;
      });
    res.status(200).json(races);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const getClassList = async (req, res) => {
  try {
    const classList = await fetch("https://www.dnd5eapi.co/api/classes")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.results;
      });
    res.status(200).json(classList);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const getMonsterByurl = async (req, res) => {
  const url = req.query["url"];
  console.log(url);
  try {
    const monster = await fetch(`https://www.dnd5eapi.co${url}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
    res.status(200).json(monster);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

module.exports = {
  createPc,
  createMonsterDB,
  getMonsterDB,
  getPc,
  getMonsterList,
  getRaceList,
  getClassList,
  getMonsterByurl,

  async getMonsterByIndex(index) {
    return await fetch(`https://www.dnd5eapi.co/api/${index}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  },
};
