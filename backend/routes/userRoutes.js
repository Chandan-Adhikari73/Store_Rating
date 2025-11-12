const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/change-password', authenticate, userController.changePassword);

router.get('/stores', authenticate, userController.listStores);
router.get('/stores/:id', authenticate, userController.storeDetails);
router.post('/stores/:id/rating', authenticate, userController.submitRating);
router.put('/stores/:id/rating', authenticate, userController.updateRating);
router.delete('/stores/:id/rating', authenticate, userController.deleteRating);

module.exports = router;
