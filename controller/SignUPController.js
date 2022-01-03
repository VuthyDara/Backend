const db = require("../db");
const User = db.collection("users");
const firebase = require('firebase');
const { validateSignUPData } = require("../helper");

const register = async function (req, res) {
  const { firstName, lastName, email, password } = req.body;
  getAuth()
    .createUser({
      email: email,
      emailVerified: false,
      password: password,
      displayName: `${firstName} ${lastName}`,
      disabled: false,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord);
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
    });
};
const signUp = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    };
    //   res.json(newUser);
    const { valid, errors } = validateSignUPData(newUser);
    if (!valid)
      //checking validation
        return res.status(400).json(errors);
    let token, userId;
    db.collection("users")
      .where("email", "==", newUser.email)
      .get()
      .then((doc) => {
        if (doc.exists) {
            return res.status(400).json({ handle: "The user id already taken" });
        } else {
            return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
      })
      .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
      })
      .then((idToken) => {
            token = idToken;
            const userCredentials = {
                userId,
                email: newUser.email,
                createdAt: new Date().toISOString(),
            };
            db.doc(`/users/${userId}`).set(userCredentials);
      })
      .then(() => {
            return res.status(201).json({ token });
      })
      .catch((err) => {
            if (err.code == "auth/email-already-in-use") {
                return res.status(400).json({ email: "Email already exist!" });
            }
            return res.status(500).json({ error: err.message });
      });
};

module.exports = {
    signUp,
};