const express = require('express');
const router = express.Router();
const controller = require('../controllers/enterpriseController');
const authGuard = require('../middleware/auth');

router.get('/analytics', authGuard, controller.getAnalytics);
router.get('/records', authGuard, controller.getRecords);
router.post('/records', authGuard, controller.createRecord);

module.exports = router;
