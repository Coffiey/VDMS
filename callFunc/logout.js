const knex = require("../db/knex");

const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    const user = await knex.select("*").from("user").where({
      refresh_token: refreshToken,
    });
    if (user.length === 0) {
      await knex("user").where("user_name", "=", user.user_name).update({
        refresh_token: null,
      });
      res.clearCookie("jwt", { httpOnly: true, sameSite: true, secure: true }); // secure:true for prod
    } else {
      res.clearCookie("jwt", { httpOnly: true, sameSite: true, secure: true });
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

module.exports = {
  logout,
};
