const pool = require('../db');

// 🏪 Get all stores owned by the logged-in owner
exports.myStores = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      'SELECT id, name, email, address FROM stores WHERE owner_id = ?',
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ⭐ Get all ratings for a specific store (only if owned by this user)
exports.storeRatings = async (req, res) => {
  try {
    const userId = req.user.id;
    const storeId = req.params.id;

    const [owns] = await pool.query(
      'SELECT id FROM stores WHERE id = ? AND owner_id = ?',
      [storeId, userId]
    );
    if (!owns.length) return res.status(403).json({ message: 'Forbidden' });

    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, r.rating, r.created_at
       FROM ratings r 
       JOIN users u ON u.id = r.user_id 
       WHERE r.store_id = ?`,
      [storeId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 📊 Get rating summary (average + total) for a store owned by this user
exports.storeSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const storeId = req.params.id;

    const [owns] = await pool.query(
      'SELECT id FROM stores WHERE id = ? AND owner_id = ?',
      [storeId, userId]
    );
    if (!owns.length) return res.status(403).json({ message: 'Forbidden' });

    const [rows] = await pool.query(
      `SELECT 
         COALESCE(AVG(rating), 0) AS averageRating, 
         COUNT(*) AS totalRatings 
       FROM ratings WHERE store_id = ?`,
      [storeId]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
