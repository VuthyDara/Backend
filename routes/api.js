const express = require("express");
const router = express.Router();
const { login } = require("../controller/AuthController");
const { register } = require("../controller/SignUPController");
const { checkIfAuthenticated } = require('../controller/middleware/auth');
const { follow, unFollow } = require("../controller/UserController");

router.post("/login", login);
router.post('/register', register);
router.post('/follow', checkIfAuthenticated,  follow);
router.post('/unfollow', checkIfAuthenticated,  unFollow);
// router.get('/hello', checkIfAuthenticated, async (_, res) => {
//   return res.send(_.authId);
// });

module.exports = {
  routes: router,
};
