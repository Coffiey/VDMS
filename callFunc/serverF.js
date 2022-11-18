const knex = require("../db/knex");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  async createUser(userInfo) {
    const { firstName, lastName, email } = userInfo;
    const [id] = await knex("user")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
      })
      .returning("id");

    return id;
  },

 async getUserByEmail({email}) {
    const [userObj] = await knex
     .select("*")
     .from('user')
     .where({
        email
     })
     return userObj
 },

 async createPc(playerInfo) {
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
    wis
   } = playerInfo;
  return await knex("pc")
    .insert({
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
      wis
    })
},

async createMonsterDB(playerInfo) {
  const {
    monsterName,
    health,
    monsterReference,
    index
   } = playerInfo;
  return await knex("monster")
    .insert({
      monster_name: monsterName,
      health,
      monster_reference: monsterReference,
      index
    })
},

async getMonsterDB() {
  const monsterObj = await knex
   .select("*")
   .from('monster')
   return monsterObj
},

async getPc() {
  const PcObj = await knex
   .select("*")
   .from('pc')
   return PcObj
},


 async getMonsterList() {
     return await fetch("https://www.dnd5eapi.co/api/monsters")
     .then((response) => {
        return response.json()
    })
     .then((data) => {
       return data.results
     })
 },

 async getRaceList() {
  return await fetch("https://www.dnd5eapi.co/api/races")
  .then((response) => {
     return response.json()
 })
  .then((data) => {
    return data.results
  })
},

async getClassList() {
  return await fetch("https://www.dnd5eapi.co/api/classes")
  .then((response) => {
     return response.json()
 })
  .then((data) => {
    return data.results
  })
},

 async getMonsterByurl(url) {
  return await fetch(`https://www.dnd5eapi.co${url}`)
  .then((response) => {
     return response.json()
 })
  .then((data) => {
    return data
  })
},

async getMonsterByIndex(index) {
  return await fetch(`https://www.dnd5eapi.co/api/${index}`)
  .then((response) => {
     return response.json()
 })
  .then((data) => {
    return data
  })
},

};
