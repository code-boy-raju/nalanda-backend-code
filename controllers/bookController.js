const Book = require('../models/book');
const { validationResult } = require('express-validator');

exports.createBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { title, author, isbn, publicationDate, genre, totalCopies } = req.body;
    const book = new Book({
      title, author, isbn, publicationDate, genre,
      totalCopies,
      availableCopies: totalCopies
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const updates = req.body;
    // If totalCopies is updated, adjust availableCopies accordingly
    if (updates.totalCopies && updates.totalCopies >= 0) {
      const diff = updates.totalCopies - book.totalCopies;
      book.availableCopies = Math.max(0, book.availableCopies + diff);
      book.totalCopies = updates.totalCopies;
      delete updates.totalCopies;
    }

    Object.assign(book, updates);
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre, title } = req.query;
    const filters = {};
    if (author) filters.author = { $regex: author, $options: 'i' };
    if (genre) filters.genre = { $regex: genre, $options: 'i' };
    if (title) filters.title = { $regex: title, $options: 'i' };

    const books = await Book.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ title: 1 });

    const total = await Book.countDocuments(filters);
    res.json({ page: parseInt(page), limit: parseInt(limit), total, data: books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
