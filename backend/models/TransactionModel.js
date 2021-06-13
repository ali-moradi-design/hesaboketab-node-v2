const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  item: {
    type: String,
    required: [true, 'Please add a item'],
    trim: true,
  },
  description: {
    type: String,
    maxlength: [500, 'Description can not be more than 500 characters'],
  },
  amount: {
    type: Number,
    required: [true, 'Please add a Number'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
