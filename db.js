const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const serviceAccount = require("./connexapi-86ff2-firebase-adminsdk-hxda1-082cf8bc39.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = db;
