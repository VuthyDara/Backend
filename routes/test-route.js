const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controller/TestController");

router.get("/", getAllUsers);

module.exports = {
  routes: router,
};
