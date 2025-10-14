const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowedAt: { type: Date, default: Date.now },
  returnedAt: { type: Date },
  returned: { type: Boolean, default: false }
});

module.exports = mongoose.model('Borrow', BorrowSchema);
