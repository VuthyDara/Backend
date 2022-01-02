const express = require("express");
const router = express.Router();
const { signUp } = require("../controller/SignUpController");

router.post("/register", signUp);

module.exports = {
  routes: router,
};
