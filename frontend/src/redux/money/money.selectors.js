import { createSelector } from 'reselect';

const selectMoney = (state) => state.money;

export const selectMoneyTransactions = createSelector(
  [selectMoney],
  (money) => money.transactions
);
export const selectCurrentTransaction = createSelector(
  [selectMoney],
  (money) => money.current
);
export const selectFilteredTransaction = createSelector(
  [selectMoney],
  (money) => money.filtered
);
export const selectErrorTransaction = createSelector(
  [selectMoney],
  (money) => money.error
);
export const selectLoadingTransaction = createSelector(
  [selectMoney],
  (money) => money.loading
);

export const selectMoneyTransactionsIncome = createSelector(
  [selectMoneyTransactions],
  (transactions) =>
    transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
);
export const selectMoneyTransactionsExpence = createSelector(
  [selectMoneyTransactions],
  (transactions) =>
    transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
);

export const selectMoneyTransactionsTotal = createSelector(
  [selectMoneyTransactions],
  (transactions) =>
    transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
);
