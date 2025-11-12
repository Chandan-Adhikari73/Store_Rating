// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const storeRoutes = require('./routes/storeRoutes'); // NEW: added

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/store', storeRoutes); // NEW: store endpoints

// Test route
app.get('/', (req, res) => res.json({ ok: true }));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server running on port', port));
