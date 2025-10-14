const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/roles');
const reports = require('../controllers/reportController');

router.get('/most-borrowed', auth, requireRole('admin'), reports.mostBorrowedBooks);
router.get('/active-members', auth, requireRole('admin'), reports.activeMembers);
router.get('/availability', auth, requireRole('admin'), reports.bookAvailability);

module.exports = router;
