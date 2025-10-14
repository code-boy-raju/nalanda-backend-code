const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/auth.js');
const requireRole = require('../middlewares/roles.js');
const { bookCreateValidators } = require('../utils/validators');

router.get('/', auth, bookController.listBooks); // all authenticated users
router.post('/', auth, requireRole('admin'), bookCreateValidators, bookController.createBook); // admin
router.put('/:id', auth, requireRole('admin'), bookController.updateBook); // admin
router.delete('/:id', auth, requireRole('admin'), bookController.deleteBook); // admin

module.exports = router;
