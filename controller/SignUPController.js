const db = require("../db");
const {getAuth, UserRecord} = require('firebase-admin/auth');
const User = db.collection("users");
// const firebase = require('firebase');
// const { validateSignUPData } = require("../helper");

const register = async function (req, res) {
  // const user = await User.get();
  const { fullName, username, email, password } = req.body;
  var data = null;
  getAuth()
  .createUser({
    email: email,
    emailVerified: false,
    password: password,
    displayName: username,
    disabled: false,
  })
  .then((userRecord) => {
    data = {
      'uid': userRecord.uid,
      'email':userRecord.email,
      'full_name': fullName,
      'username': userRecord.displayName,
      'disabled': userRecord.disabled
    };
    User.doc(data.uid).set(data)
    res.json({ message: true, info: "Create successfully"});
  })
  .catch((error) => {
    console.log("Error creating new user:", error);
    res.json({ message: false, info: error });
  });
};
// const signUp = (req, res) => {
//     const newUser = {
//         email: req.body.email,
//         password: req.body.password,
//         confirmPassword: req.body.confirmPassword,
//     };
//     //   res.json(newUser);
//     const { valid, errors } = validateSignUPData(newUser);
//     if (!valid)
//       //checking validation
//         return res.status(400).json(errors);
//     let token, userId;
//     db.collection("users")
//       .where("email", "==", newUser.email)
//       .get()
//       .then((doc) => {
//         if (doc.exists) {
//             return res.status(400).json({ handle: "The user id already taken" });
//         } else {
//             return firebase
//             .auth()
//             .createUserWithEmailAndPassword(newUser.email, newUser.password);
//         }
//       })
//       .then((data) => {
//             userId = data.user.uid;
//             return data.user.getIdToken();
//       })
//       .then((idToken) => {
//             token = idToken;
//             const userCredentials = {
//                 userId,
//                 email: newUser.email,
//                 createdAt: new Date().toISOString(),
//             };
//             db.doc(`/users/${userId}`).set(userCredentials);
//       })
//       .then(() => {
//             return res.status(201).json({ token });
//       })
//       .catch((err) => {
//             if (err.code == "auth/email-already-in-use") {
//                 return res.status(400).json({ email: "Email already exist!" });
//             }
//             return res.status(500).json({ error: err.message });
//       });
// };

module.exports = {
    // signUp,
    register
};