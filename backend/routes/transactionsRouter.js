const express = require('express');
const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionsController');

const Transaction = require('../models/TransactionModel');

// Include other resource routers

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers

router
  .route('/')
  .get(protect, advancedResults(Transaction), getTransactions)
  .post(protect, authorize('user', 'admin'), createTransaction);

router
  .route('/:id')
  .get(protect, getTransaction)
  .put(protect, authorize('user', 'admin'), updateTransaction)
  .delete(protect, authorize('user', 'admin'), deleteTransaction);

module.exports = router;
