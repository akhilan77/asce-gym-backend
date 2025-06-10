// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.json({ message: 'All users will be listed here' });
});

module.exports = router;
