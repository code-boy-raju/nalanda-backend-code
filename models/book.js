const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  author: { type: String, required: true, index: true },
  isbn: { type: String, required: true, unique: true },
  publicationDate: { type: Date },
  genre: { type: String, index: true },
  totalCopies: { type: Number, default: 1 },
  availableCopies: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);
