require("dotenv").config({ path: "./.env.local"});

const express = require("express");
const router = require('./router/router.js');
const app = express();

const PORT = process.env.PORT || 8080;

//build file
app.use("/", express.static(__dirname +"/.." + "/build"));

// front end
app.use(express.json());
app.use(router);

app.get("/api",async (req, res) => {
	await res.send("Hello This is adam");
});

app.listen(PORT, () => {
	console.log(`listening on port : ${PORT}`);
});