const knex = require("../db/knex");

const jwt = require("jsonwebtoken");
requre("dotenv").config();

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const user = await knex.select("*").from("user").where({
      refresh_token: refreshToken,
    });
    if (user.length === 0) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_TOKEN,
        (err, decoded) => {
          if (err || user.user_name !== decoded.user_name) {
            return res.sendStatus(403);
          }
          const accessToken = jwt.sign(
            {
              userName: decoded.user_name,
              id: decoded.id,
            },
            process.env.ACCESS_SECRET_TOKEN,
            { expiresIn: "5m" }
          );
          res.json(accessToken);
        }
      );
    } else {
      res.status(403).json("access denied");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

module.exports = {
  handleRefreshToken,
};
