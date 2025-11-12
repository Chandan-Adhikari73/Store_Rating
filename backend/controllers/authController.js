const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ===================== SIGNUP =====================
exports.signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (!name || name.length < 2 || name.length > 60)
      return res.status(400).json({ message: 'Name must be 2–60 characters' });
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });
    if (password.length < 8 || password.length > 16)
      return res.status(400).json({ message: 'Password must be 8–16 characters' });
    if (!/[A-Z]/.test(password) || !/[^A-Za-z0-9]/.test(password))
      return res
        .status(400)
        .json({ message: 'Password must include one uppercase letter and one special character' });

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length)
      return res.status(400).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hash, address || null, 'USER']
    );

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ===================== LOGIN =====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // 🧩 Debug logs (to diagnose hash mismatch)
    console.log('--- LOGIN DEBUG ---');
    console.log('Entered password:', password);
    console.log('Hash in DB:', user.password);

    const ok = await bcrypt.compare(password, user.password);
    console.log('Compare result:', ok);
    console.log('-------------------');

    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
