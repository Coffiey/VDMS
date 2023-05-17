const knex = require("../db/knex");

const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = await knex.select("*").from("user").where({
      refresh_token: refreshToken,
    });
    if (user.length !== 0) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_TOKEN,
        (err, decoded) => {
          console.log(decoded);
          if (err || user[0].user_name !== decoded.info.userName) {
            return res.sendStatus(403);
          }
          const accessToken = jwt.sign(
            {
              info: {
                userName: decoded.info.userName,
                id: decoded.info.id,
              },
            },
            process.env.ACCESS_SECRET_TOKEN,
            { expiresIn: "30s" }
          );
          res.json({ accessToken });
        }
      );
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

module.exports = {
  handleRefreshToken,
};
