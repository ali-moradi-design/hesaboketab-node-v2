import MoneyActionTypes from './money.types';
import axios from 'axios';

export const getTransactions = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/transactions');
    dispatch({
      type: MoneyActionTypes.GET_ITEMS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: MoneyActionTypes.TRANSACTION_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const addItem = (transaction) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  transaction.id = transaction.id * 1;
  try {
    const res = await axios.post('/api/v1/transactions', transaction, config);
    dispatch({
      type: MoneyActionTypes.ADD_ITEM,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: MoneyActionTypes.TRANSACTION_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const removeItem = (id) => async (dispatch) => {
  try {
    await axios.delete(`api/v1/transactions/${id}`);
    dispatch({
      type: MoneyActionTypes.REMOVE_ITEM,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: MoneyActionTypes.TRANSACTION_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const updateItem = (transaction) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(
      `/api/v1/transactions/${transaction._id}`,
      transaction,
      config
    );
    dispatch({
      type: MoneyActionTypes.UPDATE_ITEM,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: MoneyActionTypes.TRANSACTION_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const clearTransactions = () => ({
  type: MoneyActionTypes.CLEAR_ITEMS,
});

export const setCurrentItem = (transaction) => ({
  type: MoneyActionTypes.SET_CURRENT_ITEM,
  payload: transaction,
});

export const clearCurrentItem = () => ({
  type: MoneyActionTypes.CLEAR_CURRENT_ITEM,
});

export const filteredItem = (text) => ({
  type: MoneyActionTypes.FILTER_ITEM,
  payload: text,
});

export const clearFilter = () => ({
  type: MoneyActionTypes.CLEAR_FILTER,
});
