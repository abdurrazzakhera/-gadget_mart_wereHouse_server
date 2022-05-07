const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

//middle ware
app.use(cors());
app.use(express.json());

//Port
const port = process.env.PORT || 5000;

//App server get
app.get("/", (req, res) => {
  res.send("Hero");
});

//App listen
app.listen(port, () => {
  console.log("hello the port is runnig", port);
});
