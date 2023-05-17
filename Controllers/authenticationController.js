const knex = require("../db/knex");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
// requre("dotenv").config();

const createUser = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return {
      status: "400",
      message: "Username and Password are Required",
    };
  }
  try {
    const userList = await knex.select("*").from("user").where({
      user_name: userName,
    });
    if (userList.length === 0) {
      const hashPwd = await bcrypt.hash(password, 10);
      const [user] = await knex("user")
        .insert({
          user_name: userName,
          password: hashPwd,
        })
        .returning(["user_name", "id"]);
      res.status(201).json(user);
    } else {
      res.status(409).json("User Already Exists");
    }
  } catch {
    res.status(500).json("something went wrong");
  }
};

const getUserByUsername = async (req, res) => {
  console.log(req.body);
  const { userName, password } = req.body;
  try {
    const userObj = await knex.select("*").from("user").where({
      user_name: userName,
    });

    if (userObj.length === 0) {
      return res.status(403).json("User Name or Password Incorrect");
    }

    const match = await bcrypt.compare(password, userObj[0].password);

    if (!match) {
      return res.status(403).json("User Name or Password Incorrect");
    }
    const accessToken = jwt.sign(
      {
        info: { userName: userObj[0].user_name, id: userObj[0].id },
      },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: "10m" }
    );
    const refreshToken = jwt.sign(
      {
        info: { userName: userObj[0].user_name, id: userObj[0].id },
      },
      process.env.REFRESH_SECRET_TOKEN,
      { expiresIn: "1d" }
    );
    await knex("user").where("user_name", "=", userObj[0].user_name).update({
      refresh_token: refreshToken,
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ accessToken });
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

module.exports = {
  createUser,
  getUserByUsername,
};
