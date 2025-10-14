const Borrow = require('../models/borrow');
const Book = require('../models/book');
const mongoose = require('mongoose');

exports.borrowBook = async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.bookId;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const book = await Book.findById(bookId).session(session);
    if (!book) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.availableCopies <= 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'No copies available' });
    }

    // Decrement and create borrow
    book.availableCopies -= 1;
    await book.save({ session });

    const borrow = new Borrow({ user: userId, book: bookId });
    await borrow.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'Book borrowed', borrow });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.returnBook = async (req, res) => {
  const userId = req.user.id;
  const borrowId = req.params.borrowId;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const borrow = await Borrow.findById(borrowId).session(session);
    if (!borrow) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Borrow record not found' });
    }
    if (borrow.user.toString() !== userId && req.user.role !== 'admin') {
      await session.abortTransaction();
      return res.status(403).json({ message: 'Not allowed to return this borrow record' });
    }
    if (borrow.returned) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Book already returned' });
    }

    borrow.returned = true;
    borrow.returnedAt = new Date();
    await borrow.save({ session });

    const book = await Book.findById(borrow.book).session(session);
    if (book) {
      book.availableCopies = Math.min(book.totalCopies, book.availableCopies + 1);
      await book.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.json({ message: 'Book returned', borrow });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserHistory = async (req, res) => {
  const userId = req.user.id;
  try {
    const history = await Borrow.find({ user: userId }).populate('book').sort({ borrowedAt: -1 });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
