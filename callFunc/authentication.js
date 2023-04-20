const knex = require("../db/knex");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken");
// requre("dotenv").config();

module.exports = {
      async getUserByUsername(userName, password) {
        const [userObj] = await knex
         .select("*")
         .from('user')
         .where({
          user_name:userName
         })
         console.log("😴",userObj)
         const match = await bcrypt.compare(password, userObj.password)
        //  console.log(process.env.ACCESS_SECRET_TOKEN)
         if (match) {
            const accessToken = jwt.sign(
                {
                 userName: userObj.user_name,
                 id: userObj.id  
                },
                process.env.ACCESS_SECRET_TOKEN,
                {expiresIn: '30s'}
                )

            const refreshToken = jwt.sign(
                {
                 userName: userObj.user_name,
                 id: userObj.id  
                },
                process.env.REFRESH_SECRET_TOKEN,
                {expiresIn: '1d'})
                let repsonse = [match, accessToken]
             return repsonse
         } else {
            console.log('🤯',match)
            return [match]
         }
        },
    
}