const knex = require("../db/knex");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bcrypt = require("bcrypt");

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

module.exports = {
  createUser,
};
