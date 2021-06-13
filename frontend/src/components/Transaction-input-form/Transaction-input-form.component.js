import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentTransaction } from '../../redux/money/money.selectors';
import {
  addItem,
  clearCurrentItem,
  updateItem,
} from '../../redux/money/money.actions';
import { setAlert, removeAlert } from '../../redux/alert/alert.actions';

import './Transaction-input-form.styles.scss';

const genrateID = () => Math.floor(Math.random() * 100000000);

const TransactionInputForm = ({
  addItem,
  updateItem,
  setAlert,
  current,
  clearCurrentItem,
}) => {
  useEffect(() => {
    if (current !== null) {
      setTransaction(current);
    } else {
      setTransaction({
        item: '',
        amount: '',
        description: '',
      });
    }
  }, [current]);
  const [transaction, setTransaction] = useState({
    item: '',
    amount: '',
    description: '',
  });

  const { item, amount, description } = transaction;

  const onChange = (e) =>
    setTransaction({ ...transaction, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      if (item === '' || amount === '') {
        setAlert({
          msg: ' لطفا فیلد ها پر کنید !',
          type: 'danger',
          id: genrateID(),
        });
        setTransaction({
          item: '',
          amount: '',
          description: '',
        });
      } else {
        addItem(transaction);
        setTransaction({
          item: '',
          amount: '',
          description: '',
        });
      }
    } else {
      if (item === '' || amount === '') {
        setAlert({
          msg: ' لطفا فیلد ها پر کنید !',
          type: 'danger',
          id: genrateID(),
        });
      } else {
        updateItem(transaction);
      }
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrentItem();
  };

  return (
    <div className='form-input'>
      <h2>
        {current
          ? 'از اینجا ویرایش کنید :'
          : 'آیتم مورد نظر خود را اضافه کنید :'}
      </h2>
      <p>{!current && 'برای مقادیر منفی در فیلد مبلغ " - " را درج نمایید'}</p>
      <form className='form' onSubmit={onSubmit} dir='rtl'>
        <div className='aaaainputs'>
          <div className='form-control'>
            <label htmlFor='item'>آیتم:</label>
            <input
              type='text'
              id='item'
              name='item'
              placeholder='آیتم'
              value={item}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='password'>مبلغ:</label>
            <input
              className='amount'
              type='number'
              id='amount'
              name='amount'
              placeholder='مبلغ'
              value={amount}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='description'>توضیحات:</label>
            <input
              type='text'
              id='description'
              name='description'
              placeholder='توضیحات'
              value={description}
              onChange={onChange}
            />
          </div>
        </div>

        <button className='btn' type='submit'>
          {current ? 'به روز رسانی' : 'ثبت'}{' '}
        </button>
      </form>
      {current && (
        <div className='clear'>
          <button className='btn btn-blue' onClick={clearAll} type='submit'>
            حذف ویرایش
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  current: selectCurrentTransaction,
});

const mapDispatchToProps = (dispatch) => ({
  setAlert: (item) => {
    dispatch(setAlert(item));
    setTimeout(() => dispatch(removeAlert(item.id)), 5000);
  },
  addItem: (item) => dispatch(addItem(item)),
  updateItem: (item) => dispatch(updateItem(item)),
  clearCurrentItem: () => dispatch(clearCurrentItem()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionInputForm);
