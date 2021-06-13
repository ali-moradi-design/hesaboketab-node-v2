import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectMoneyTransactionsIncome,
  selectMoneyTransactionsExpence,
  selectMoneyTransactionsTotal,
} from '../../redux/money/money.selectors';
import './display-transaction-values.styles.scss';

const DisplayTransactionValues = ({ income, expence, total }) => {
  const numberWithCommas = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
    return x;
  };
  return (
    <div className='display-values'>
      <div className='balance-container'>
        <h1 className='balance'>{numberWithCommas(total)}</h1>
        <h2>: مجموع </h2>
      </div>
      <div className='inc-exp-container'>
        <div>
          <h4>درآمد</h4>
          <p dir='rtl' className='money-plus'>
            {income === 0 ? `_` : `${numberWithCommas(income)}+ تومان`}
          </p>
        </div>
        <div>
          <h4>مخارج</h4>
          <p dir='rtl' className='money minus'>
            {expence === 0 ? `_` : `${numberWithCommas(expence * -1)}- تومان`}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  income: selectMoneyTransactionsIncome,
  expence: selectMoneyTransactionsExpence,
  total: selectMoneyTransactionsTotal,
});

export default connect(mapStateToProps)(DisplayTransactionValues);
