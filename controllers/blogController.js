const db = require('../db');

exports.getAllPosts = (req, res) => {
  db.query('SELECT * FROM blog ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createPost = (req, res) => {
  const { title, content, author } = req.body;
  db.query(
    'INSERT INTO blog (title, content, author) VALUES (?, ?, ?)',
    [title, content, author],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Blog post created' });
    }
  );
};
