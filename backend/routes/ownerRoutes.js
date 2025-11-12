const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const ownerController = require('../controllers/ownerController');

router.use(authenticate);
router.use(authorize(['OWNER']));

router.get('/stores', ownerController.myStores);
router.get('/stores/:id/ratings', ownerController.storeRatings);
router.get('/stores/:id/summary', ownerController.storeSummary);

module.exports = router;
