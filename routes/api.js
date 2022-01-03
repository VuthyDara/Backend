const express = require("express");
const router = express.Router();
const { login } = require("../controller/AuthController");
const { checkIfAuthenticated } = require('../controller/middleware/auth');

router.post("/login", login);
router.get('/hello', checkIfAuthenticated, async (_, res) => {
  return res.send(_.authId);
});

module.exports = {
  routes: router,
};
