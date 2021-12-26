const db = require("../db");
const User = db.collection("users");

const getAllUsers = async function (req, res) {
  const users = await User.get();
  const arr = [];
  users.forEach((doc) => {
    arr.push(doc.data());
  });

  res.send(arr);
};

module.exports = {
  getAllUsers,
};
