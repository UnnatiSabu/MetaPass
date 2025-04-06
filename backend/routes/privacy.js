const express = require('express');
const router = express.Router();

const { revokeCookies } = require('../controllers/cookieRevoke');

router.post('/revoke-cookies', revokeCookies);

// Existing /clear endpoint can stay here too
router.post('/clear', (req, res) => {
  res.json({ message: '🧹 Cleared cache and cookies!' });
});

module.exports = router;