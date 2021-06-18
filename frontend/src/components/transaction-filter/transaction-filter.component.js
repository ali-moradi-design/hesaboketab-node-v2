import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFilteredTransaction } from '../../redux/transaction/transactions.selectors';
import {
  filteredItem,
  clearFilter,
} from '../../redux/transaction/transactions.actions';
import './transaction-filter.styles.scss';

const TransactionFilter = ({ filteredItem, clearFilter, filtered }) => {
  const text = useRef('');
  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== ' ') {
      filteredItem(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form className='form-filter'>
      <input
        ref={text}
        type='text'
        placeholder=' فیلتر کردن آیتم ...'
        onChange={onChange}
      />
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  filtered: selectFilteredTransaction,
});

const mapDispatchToProps = (dispatch) => ({
  filteredItem: (text) => {
    dispatch(filteredItem(text));
  },
  clearFilter: () => {
    dispatch(clearFilter());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionFilter);
