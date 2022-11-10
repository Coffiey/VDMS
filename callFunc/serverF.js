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
 async getMonsterList() {
     return await fetch("https://www.dnd5eapi.co/api/monsters")
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

};
