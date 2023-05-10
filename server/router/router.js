const express = require("express");
const {
  getMonsterList,
  getMonsterByurl,
  getMonsterByIndex,
  getRaceList,
  getClassList,
  createPc,
  getPc,
  createMonsterDB,
  getMonsterDB,
} = require("../../callFunc/serverF");

const { createUser } = require("../../callFunc/register");

const { getUserByUsername } = require("../../callFunc/authentication");

const verifyJWT = require("../../middleware/verifyJWT");

const router = express.Router();
router.route("/api/user").get(getUserByUsername).post(createUser);

router.post("/api/pc", async (req, res) => {
  try {
    console.log(req.body);
    const id = await createPc(req.body);
    res.status(201).json("created player Character");
  } catch (err) {
    res.status(500).json("something went wrong");
  }
});

router.post("/api/enemy", async (req, res) => {
  try {
    console.log(req.body);
    const id = await createMonsterDB(req.body);
    res.status(201).json("created monster");
  } catch (err) {
    res.status(500).json("something went wrong");
  }
});

router.get("/api/pc", async (req, res) => {
  try {
    const pcObj = await getPc();
    res.status(201).json(pcObj);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
});

router.get("/api/enemy", async (req, res) => {
  try {
    const monster = await getMonsterDB();
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
});

router.get("/api/monster", async (req, res) => {
  try {
    const monsters = await getMonsterList();
    res.status(200).json(monsters);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
});

router.get("/api/races", async (req, res) => {
  try {
    const monsters = await getRaceList();
    res.status(200).json(monsters);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
});

router.get("/api/classes", async (req, res) => {
  try {
    const monsters = await getClassList();
    res.status(200).json(monsters);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
});

router.get("/api/monster/object", async (req, res) => {
  try {
    const monster = await getMonsterByurl(req.query["url"]);
    res.status(200).json(monster);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
});

module.exports = router;
