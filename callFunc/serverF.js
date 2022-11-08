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
  console.log(email)
    const [userObj] = await knex
     .select("*")
     .from('user')
     .where({
        email
     })
     return userObj
 },

 async getMonsterList(search) {
   let monster = await fetch("https://www.dnd5eapi.co/api/monsters")
     .then((response) => {
        return response.json()
    })
     .then((data) => {
       return data
     })

     let monsterName = monster.results.map((object)=>{
        return object.name
     }).filter((object) => {
       return object.toLowerCase().includes(search.toLowerCase())
        })
     return monsterName
 }
};
