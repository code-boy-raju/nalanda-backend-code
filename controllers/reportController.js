const Borrow = require('../models/borrow');
const Book = require('../models/book');
const mongoose = require('mongoose');

exports.mostBorrowedBooks = async (req, res) => {
  try {
    // Group borrow records by book and count
    const pipeline = [
      { $match: {} },
      { $group: { _id: '$book', borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'book'
        }
      },
      { $unwind: '$book' },
      { $project: { _id: 0, bookId: '$book._id', title: '$book.title', author: '$book.author', borrowCount: 1 } }
    ];
    const result = await Borrow.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.activeMembers = async (req, res) => {
  try {
    // Count borrows per user
    const pipeline = [
      { $match: {} },
      { $group: { _id: '$user', borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      { $project: { _id: 0, userId: '$user._id', name: '$user.name', email: '$user.email', borrowCount: 1 } }
    ];
    const result = await Borrow.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.bookAvailability = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalBooks: { $sum: '$totalCopies' },
          availableBooks: { $sum: '$availableCopies' },
          bookCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          totalBooks: 1,
          availableBooks: 1,
          borrowedBooks: { $subtract: ['$totalBooks', '$availableBooks'] },
          bookCount: 1
        }
      }
    ];
    const result = await Book.aggregate(pipeline);
    res.json(result[0] || { totalBooks: 0, availableBooks: 0, borrowedBooks: 0, bookCount: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
