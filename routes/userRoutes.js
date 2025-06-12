const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.get('/me', verifyToken, (req, res) => {
  res.json({
    message: 'User verified',
    user: req.user, // { id: ..., iat: ..., exp: ... }
  });
});

module.exports = router;
