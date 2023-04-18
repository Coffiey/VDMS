const knex = require("../db/knex");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bcrypt = require("bcrypt")

module.exports = {
    async createUser(userInfo) {
        const { userName, password} = userInfo;
        console.log(userInfo)
        console.log("😍")
        if (!userName || !password) {
            console.log("😁")
            return {
                status: "400",
                message: "Username and Password are Required"
            }
        }
        const userList = await knex
        .select("*")
        .from('user')
        .where({
         user_name:userName
        })
        if (userList.length === 0) {
            const hashPwd = await bcrypt.hash(password, 10)

            const [user] = await knex("user")
            .insert({
              user_name: userName,
              password: hashPwd,

            })
            .returning("*");
            console.log()
          return user;
        }  else {
            
        }
        

      },
    
}