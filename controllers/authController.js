const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Register a new user
exports.register = (req, res) => {
  const { name, email, password, phone } = req.body;

  // 🔒 Input validation BEFORE inserting into DB
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Name, email, and password are required' });

  if (password.length < 6)
    return res.status(400).json({ error: 'Password must be at least 6 characters' });

  const hashed = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
  const values = [name, email, hashed, phone || null];

  db.query(query, values, (err) => {
    if (err) {
      console.error('❌ Registration error:', err.message);
      return res.status(500).json({ error: 'Something went wrong during registration' });
    }

    res.status(201).json({ message: '✅ User registered successfully!' });
  });
};

// ✅ Login a user
exports.login = (req, res) => {
  const { email, password } = req.body;

  // 🛡️ Input validation
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });
  console.log('email', email);

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('❌ Login error:', err.message);
      return res.status(500).json({ error: 'Server error' });
    }

    if (results.length === 0)
      return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'fallbackSecret',
      { expiresIn: '1d' }
    );

    res.json({
      message: '✅ Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || null
      }
    });
  });
};
