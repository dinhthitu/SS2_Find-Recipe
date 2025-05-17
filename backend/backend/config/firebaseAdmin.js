const admin = require('firebase-admin');
const serviceAccount = require('../finder-recipe-firebase-adminsdk-fbsvc-71212a3c91.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;