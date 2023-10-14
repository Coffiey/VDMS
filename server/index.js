require("dotenv").config({ path: "./.env.local" });

const express = require("express");
const cors = require("cors");
const corsOptions = require("../config/corsOptions");
const router = require("./router/router.js");
const authRouter = require("./router/authRouter.js");
const refresh = require("./router/refresh.js");
const logout = require("./router/logoutroute.js");
const auth = require("./router/auth.js");
const credentials = require("../middleware/credentials.js");
const cookieParser = require("cookie-parser");
const verifyJWT = require("../middleware/verifyJWT");
const app = express();

const PORT = process.env.PORT || 8080;

//build file
app.use("/", express.static(__dirname + "/.." + "/build"));

// front end
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", auth);
app.use("/logout", logout);
app.use("/refresh", refresh);
app.use("/api", router);
app.use(verifyJWT);
app.use("/db", authRouter);

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});
