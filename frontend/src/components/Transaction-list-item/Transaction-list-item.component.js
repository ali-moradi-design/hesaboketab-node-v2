import React, { useEffect } from 'react';
import Spinner from '../../pages/spinner/spinner.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectMoneyTransactions,
  selectFilteredTransaction,
  selectLoadingTransaction,
} from '../../redux/transaction/transactions.selectors';
import { getTransactions } from '../../redux/transaction/transactions.actions';
import TransactionItem from '../Transaction-item/Transaction-item.component';

import './Transaction-list-item.styles.scss';

const TransactionListItem = ({
  transactions,
  filtered,
  getTransactions,
  loading,
}) => {
  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  if (transactions !== [] && transactions.length === 0 && !loading) {
    return <div className='no-item'>آیتمی موجود نیست</div>;
  }

  return (
    <div className='list-items'>
      {transactions !== [] && !loading ? (
        <table className='table-body'>
          <thead>
            <tr>
              <th>آیتم</th>
              <th>مبلغ</th>
              <th>توضیحات</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {filtered !== null
              ? filtered.map((transaction) => (
                  <TransactionItem
                    key={transaction._id}
                    transaction={transaction}
                  />
                ))
              : transactions.map((transaction) => (
                  <TransactionItem
                    key={transaction._id}
                    transaction={transaction}
                  />
                ))}
          </tbody>
        </table>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  transactions: selectMoneyTransactions,
  filtered: selectFilteredTransaction,
  loading: selectLoadingTransaction,
});

const mapDispatchToProps = (dispatch) => ({
  getTransactions: () => {
    dispatch(getTransactions());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionListItem);
