const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    res.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
