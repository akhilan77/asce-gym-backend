const express = require('express');
const router = express.Router();
const db = require('../db');

// POST contact message
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  db.query(
    'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Contact message submitted successfully' });
    }
  );
});

module.exports = router;
