import {
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_LIST_FAIL,
  TRANSACTION_LIST_FILTERED_REQUEST,
  TRANSACTION_LIST_FILTERED_SUCCESS,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DETAILS_RESET,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_CREATE_RESET,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_UPDATE_REQUEST,
  TRANSACTION_UPDATE_SUCCESS,
  TRANSACTION_UPDATE_FAIL,
  TRANSACTION_UPDATE_RESET,
} from './transactions.types';

export const transactionListReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_LIST_REQUEST:
      return { loading: true, transactions: [] };
    case TRANSACTION_LIST_SUCCESS:
      return {
        loading: false,
        transactions: action.payload,
        total: action.payload.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        ),
        income: action.payload
          .filter((transaction) => transaction.amount > 0)
          .reduce((acc, transaction) => acc + transaction.amount, 0),
        expence: action.payload
          .filter((transaction) => transaction.amount < 0)
          .reduce((acc, transaction) => acc + transaction.amount, 0),
      };
    case TRANSACTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const transactionFilterdListReducer = (
  state = { transactionsFilterd: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_LIST_FILTERED_REQUEST:
      return { transactionsFilterd: [] };
    case TRANSACTION_LIST_FILTERED_SUCCESS:
      return {
        transactionsFilterd: action.payload,
      };
    default:
      return state;
  }
};

export const transactionDetailsReducer = (
  state = { transaction: {} },
  action
) => {
  switch (action.type) {
    case TRANSACTION_DETAILS_REQUEST:
      return { ...state, loading: true };
    case TRANSACTION_DETAILS_SUCCESS:
      return { loading: false, transaction: action.payload };
    case TRANSACTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_DETAILS_RESET:
      return { transaction: {} };
    default:
      return state;
  }
};

export const transactionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_DELETE_REQUEST:
      return { loading: true };
    case TRANSACTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TRANSACTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const transactionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return { loading: true };
    case TRANSACTION_CREATE_SUCCESS:
      return { loading: false, success: true, transaction: action.payload };
    case TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const transactionUpdateReducer = (
  state = { transaction: {} },
  action
) => {
  switch (action.type) {
    case TRANSACTION_UPDATE_REQUEST:
      return { loading: true };
    case TRANSACTION_UPDATE_SUCCESS:
      return { loading: false, success: true, transaction: action.payload };
    case TRANSACTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_UPDATE_RESET:
      return { transaction: {} };
    default:
      return state;
  }
};
