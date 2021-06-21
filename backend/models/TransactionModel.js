import mongoose from 'mongoose';

const TransactionSchema = mongoose.Schema(
  {
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
    necessary: {
      type: Boolean,
      default: false,
    },
    happendAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
