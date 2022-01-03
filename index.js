"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const api = require("./routes/api");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", api.routes);

app.listen(config.port || process.env.PORT, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
