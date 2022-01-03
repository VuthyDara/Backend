const {initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore/lite");
const config = require('../config');
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const login = async function (req, res) {
  const { email, password } = req.body;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      res.json({login: user});
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      res.json({ Login: errorMessage });
    });
};

module.exports = {
  login,
};
