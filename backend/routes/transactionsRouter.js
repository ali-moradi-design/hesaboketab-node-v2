import express from 'express';
import {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactionsController.js';

import Transaction from '../models/TransactionModel.js';

// Include other resource routers

const router = express.Router();

import advancedResults from '../middleware/advancedResults.js';
import { protect, authorize } from '../middleware/auth.js';

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

export default router;
