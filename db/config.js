var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const storage = admin.storage().bucket('medical-blog-5dfd9.appspot.com');
module.exports = { db , storage, admin};