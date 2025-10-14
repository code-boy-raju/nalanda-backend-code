const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const borrowController = require('../controllers/borrowController');

router.post('/borrow/:bookId', auth, borrowController.borrowBook);
router.post('/return/:borrowId', auth, borrowController.returnBook);
router.get('/history', auth, borrowController.getUserHistory);

module.exports = router;
