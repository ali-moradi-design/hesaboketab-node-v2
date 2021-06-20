const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Transaction = require('../models/TransactionModel');

// @desc      Get all transactions
// @route     GET /api/v1/transactions
// @access    Private
exports.getTransactions = asyncHandler(async (req, res, next) => {
  const transactions = await Transaction.find({ user: req.user.id }).sort({
    date: -1,
  });

  res.status(200).json({ success: true, data: transactions });
});

// @desc      Get single transaction
// @route     GET /api/v1/transactions/:id
// @access    Private
exports.getTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(
      new ErrorResponse(
        `Transaction not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure user is transaction owner
  if (
    transaction.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to get this transaction`,
        401
      )
    );
  }

  res.status(200).json({ success: true, data: transaction });
});

// @desc      Create new transaction
// @route     POST /api/v1/transactions
// @access    Private
exports.createTransaction = asyncHandler(async (req, res, next) => {
  newTransaction = {
    user: req.user.id,
    item: req.body.item,
    description: req.body.description,
    amount: Number(req.body.amount),
    necessary: req.body.necessary,
    happendAt: req.body.happendAt,
  };

  const transaction = await Transaction.create(newTransaction);

  res.status(201).json({
    success: true,
    data: transaction,
  });
});

// @desc      Update transaction
// @route     PUT /api/v1/transactions/:id
// @access    Private
exports.updateTransaction = asyncHandler(async (req, res, next) => {
  let transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(
      new ErrorResponse(
        `Transaction not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure user is transaction owner
  if (
    transaction.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this transaction`,
        401
      )
    );
  }

  const updatedTransaction = {
    user: req.user.id,
    item: req.body.item,
    description: req.body.description,
    amount: Number(req.body.amount),
    necessary: req.body.necessary,
    happendAt: req.body.happendAt,
  };

  transaction = await Transaction.findOneAndUpdate(
    { _id: req.params.id },
    updatedTransaction,
    {
      new: false,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: transaction });
});

// @desc      Delete transaction
// @route     DELETE /api/v1/transactions/:id
// @access    Private
exports.deleteTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(
      new ErrorResponse(
        `Transaction not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure user is transaction owner
  if (
    transaction.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this transaction`,
        401
      )
    );
  }

  transaction.remove();

  res.status(200).json({ success: true, data: {} });
});
