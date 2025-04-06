const admin = require('firebase-admin');
const serviceAccount = require('/Users/yughjuneja/Desktop/metapass/backend/firebase-key.json'); // rename your JSON key here

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;