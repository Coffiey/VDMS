const knex = require("../db/knex");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getMonsterList = async (req, res) => {
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
  getMonsterList,
  getRaceList,
  getClassList,
  getMonsterByurl,

  // async getMonsterByIndex(index) {
  //   return await fetch(`https://www.dnd5eapi.co/api/${index}`)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       return data;
  //     });
  // },
};
