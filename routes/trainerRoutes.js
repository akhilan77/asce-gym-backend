const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all trainers
router.get('/', (req, res) => {
  db.query('SELECT * FROM trainers', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
