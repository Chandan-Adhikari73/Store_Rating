const pool = require('../db');
const bcrypt = require('bcryptjs');

exports.dashboard = async (req, res) => {
  try {
    const [usersRows, storesRows, ratingsRows] = await Promise.all([
      pool.query('SELECT COUNT(*) AS totalUsers FROM users'),
      pool.query('SELECT COUNT(*) AS totalStores FROM stores'),
      pool.query('SELECT COUNT(*) AS totalRatings FROM ratings')
    ]);

    const totalUsers = usersRows[0][0].totalUsers;
    const totalStores = storesRows[0][0].totalStores;
    const totalRatings = ratingsRows[0][0].totalRatings;

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || name.length < 2 || name.length > 60)
      return res.status(400).json({ message: 'Name must be 2–60 characters' });
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const hash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
      name,
      email,
      hash,
      role || 'USER'
    ]);
    res.json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;
    if (!name) return res.status(400).json({ message: 'Store name required' });

    await pool.query('INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)', [
      name,
      email || null,
      address || null,
      owner_id || null
    ]);
    res.json({ message: 'Store created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listStores = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM stores');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
