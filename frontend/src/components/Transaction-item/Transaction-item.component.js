import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  removeItem,
  setCurrentItem,
  clearCurrentItem,
} from '../../redux/money/money.actions';
import './Transaction-item.styles.scss';

const TransactionItem = ({
  transaction,
  removeItem,
  setCurrentItem,
  clearCurrentItem,
}) => {
  const { _id, item, amount, description } = transaction;
  const onDelete = () => {
    removeItem(_id);
    clearCurrentItem();
  };
  const numberWithCommas = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
    return x;
  };
  return (
    <Fragment>
      <tr>
        <td> {item}</td>
        <td dir='ltr'> {numberWithCommas(amount)}</td>
        <td> {description}</td>
        <td onClick={() => setCurrentItem(transaction)}>
          <i className='fas fa-edit'></i>
        </td>
        <td onClick={onDelete}>
          <i className='fas fa-trash-alt'></i>
        </td>
      </tr>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => {
    dispatch(removeItem(item));
  },
  setCurrentItem: (item) => {
    dispatch(setCurrentItem(item));
  },
  clearCurrentItem: () => {
    dispatch(clearCurrentItem());
  },
});

export default connect(null, mapDispatchToProps)(TransactionItem);
