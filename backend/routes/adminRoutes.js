const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.use(authenticate);
router.use(authorize(['ADMIN']));

router.get('/dashboard', adminController.dashboard);
router.post('/users', adminController.createUser);
router.get('/users', adminController.listUsers);
router.get('/stores', adminController.listStores);
router.post('/stores', adminController.createStore);

module.exports = router;
