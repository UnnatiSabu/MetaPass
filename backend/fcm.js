const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require('./firebase-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function sendFCMAlert(token, title, body) {
  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  return admin.messaging().send(message)
    .then((response) => {
      console.log("✅ FCM Alert sent:", response);
    })
    .catch((error) => {
      console.error("❌ FCM Error:", error);
    });
}

module.exports = sendFCMAlert;