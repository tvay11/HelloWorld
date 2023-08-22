var admin = require("firebase-admin");

var serviceAccount = require("./flight-project-1a1b6-2fc64bba791b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://flight-project-1a1b6-default-rtdb.firebaseio.com"
});

//firestore databases
const db = admin.firestore();


module.exports = db;
