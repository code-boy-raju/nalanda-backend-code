const { body } = require('express-validator');

const registerValidators = [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
];

const loginValidators = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
];

const bookCreateValidators = [
  body('title').notEmpty().withMessage('Title required'),
  body('author').notEmpty().withMessage('Author required'),
  body('isbn').notEmpty().withMessage('ISBN required'),
  body('totalCopies').isInt({ min: 1 }).withMessage('Total copies must be >=1')
];

module.exports = { registerValidators, loginValidators, bookCreateValidators };
