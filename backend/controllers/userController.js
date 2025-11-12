const pool = require('../db');
const bcrypt = require('bcryptjs');

// 🔒 Change user password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
      return res.status(400).json({ message: 'Missing fields' });

    const [rows] = await pool.query('SELECT password FROM users WHERE id = ?', [userId]);
    if (!rows.length) return res.status(404).json({ message: 'User not found' });

    const user = rows[0];
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) return res.status(400).json({ message: 'Old password incorrect' });

    if (newPassword.length < 8 || newPassword.length > 16)
      return res.status(400).json({ message: 'Password must be 8–16 characters' });
    if (!/[A-Z]/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword))
      return res.status(400).json({ message: 'Password must contain an uppercase and special char' });

    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hash, userId]);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🏪 List stores with optional search and user’s own ratings
exports.listStores = async (req, res) => {
  try {
    const { search_name, search_address } = req.query;
    let query = `
      SELECT 
        s.id, s.name, s.address, 
        COALESCE(AVG(r.rating), 0) AS averageRating
      FROM stores s
      LEFT JOIN ratings r ON r.store_id = s.id
      WHERE 1=1`;
    const params = [];

    if (search_name) {
      query += ' AND s.name LIKE ?';
      params.push(`%${search_name}%`);
    }
    if (search_address) {
      query += ' AND s.address LIKE ?';
      params.push(`%${search_address}%`);
    }

    query += ' GROUP BY s.id ORDER BY s.name ASC LIMIT 200';
    const [stores] = await pool.query(query, params);

    // Get user’s ratings for these stores
    const userId = req.user.id;
    const [ratings] = await pool.query('SELECT store_id, rating FROM ratings WHERE user_id = ?', [
      userId
    ]);

    const ratingMap = {};
    ratings.forEach(r => {
      ratingMap[r.store_id] = r.rating;
    });

    const response = stores.map(s => ({
      ...s,
      myRating: ratingMap[s.id] || null
    }));

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🏬 Get full store details (with user’s own rating)
exports.storeDetails = async (req, res) => {
  try {
    const storeId = req.params.id;
    const userId = req.user.id;

    const [rows] = await pool.query(
      `SELECT s.*, 
              COALESCE(AVG(r.rating), 0) AS averageRating, 
              COUNT(r.id) AS totalRatings
       FROM stores s
       LEFT JOIN ratings r ON r.store_id = s.id
       WHERE s.id = ?
       GROUP BY s.id`,
      [storeId]
    );

    if (!rows.length) return res.status(404).json({ message: 'Store not found' });

    const store = rows[0];
    const [my] = await pool.query(
      'SELECT rating FROM ratings WHERE user_id = ? AND store_id = ?',
      [userId, storeId]
    );

    res.json({ store, myRating: my[0]?.rating || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ⭐ Submit or update rating (UPSERT)
exports.submitRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const storeId = req.params.id;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5)
      return res.status(400).json({ message: 'Invalid rating (1–5)' });

    await pool.query(
      `INSERT INTO ratings (user_id, store_id, rating)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE rating = VALUES(rating)`,
      [userId, storeId, rating]
    );

    res.json({ message: 'Rating saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✏️ Update existing rating (optional separate endpoint)
exports.updateRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const storeId = req.params.id;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5)
      return res.status(400).json({ message: 'Invalid rating (1–5)' });

    const [result] = await pool.query(
      'UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?',
      [rating, userId, storeId]
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: 'Rating not found' });

    res.json({ message: 'Rating updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🗑️ Delete rating
exports.deleteRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const storeId = req.params.id;

    const [result] = await pool.query(
      'DELETE FROM ratings WHERE user_id = ? AND store_id = ?',
      [userId, storeId]
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: 'Rating not found' });

    res.json({ message: 'Rating deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
