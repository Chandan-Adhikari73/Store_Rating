const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');

// Example store route
router.get('/', authenticate, (req, res) => {
  res.json({ message: 'Store route working!' });
});

module.exports = router;
