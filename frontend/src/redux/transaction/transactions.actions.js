import axios from 'axios';
import {
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_LIST_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_UPDATE_REQUEST,
  TRANSACTION_UPDATE_SUCCESS,
  TRANSACTION_UPDATE_FAIL,
} from './transactions.types';
import { logout } from '../user/user.actions';

export const getTransactions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TRANSACTION_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'x-auth-token': userInfo.token,
      },
    };

    const { data } = await axios.get('/api/v1/transactions', config);

    dispatch({
      type: TRANSACTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTransactionDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TRANSACTION_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'x-auth-token': userInfo.token,
      },
    };

    const { data } = await axios.get(`/api/v1/transactions/${id}`, config);

    dispatch({
      type: TRANSACTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTransaction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRANSACTION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userInfo.token,
      },
    };

    await axios.delete(`/api/v1/transactions/${id}`, config);

    dispatch({
      type: TRANSACTION_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: TRANSACTION_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createTransaction =
  (transaction) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TRANSACTION_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userInfo.token,
        },
      };

      const { data } = await axios.post(
        `/api/v1/transactions`,
        transaction,
        config
      );

      dispatch({
        type: TRANSACTION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: TRANSACTION_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateTransaction =
  (transaction) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TRANSACTION_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userInfo.token,
        },
      };

      const { data } = await axios.put(
        `/api/v1/transactions/${transaction._id}`,
        transaction,
        config
      );

      dispatch({
        type: TRANSACTION_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({ type: TRANSACTION_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: TRANSACTION_UPDATE_FAIL,
        payload: message,
      });
    }
  };

// export const clearTransactions = () => ({
//   type: MoneyActionTypes.CLEAR_ITEMS,
// });

// export const setCurrentItem = (transaction) => ({
//   type: MoneyActionTypes.SET_CURRENT_ITEM,
//   payload: transaction,
// });

// export const clearCurrentItem = () => ({
//   type: MoneyActionTypes.CLEAR_CURRENT_ITEM,
// });

// export const filteredItem = (text) => ({
//   type: MoneyActionTypes.FILTER_ITEM,
//   payload: text,
// });

// export const clearFilter = () => ({
//   type: MoneyActionTypes.CLEAR_FILTER,
// });
