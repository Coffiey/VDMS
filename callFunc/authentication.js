const knex = require("../db/knex");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
// requre("dotenv").config();
const getUserByUsername = async (req, res) => {
  try {
    const [userObj] = await knex.select("*").from("user").where({
      user_name: req.query["userName"],
    });
    const match = await bcrypt.compare(req.query["password"], userObj.password);
    if (match) {
      const accessToken = jwt.sign(
        {
          userName: userObj.user_name,
          id: userObj.id,
        },
        process.env.ACCESS_SECRET_TOKEN,
        { expiresIn: "5m" }
      );

      const refreshToken = jwt.sign(
        {
          userName: userObj.user_name,
          id: userObj.id,
        },
        process.env.REFRESH_SECRET_TOKEN,
        { expiresIn: "1d" }
      );
      await knex("user").where("user_name", "=", userName).update({
        refresh_token: refreshToken,
      });
      res.status(201).json(accessToken);
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
    } else {
      res.status(403).json("access denied");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

module.exports = {
  getUserByUsername,
};
