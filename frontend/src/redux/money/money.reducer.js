import MoneyActionTypes from './money.types';
const INITIAL_STATE = {
  transactions: [],
  current: null,
  filtered: null,
  error: null,
};

const moneyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MoneyActionTypes.GET_ITEMS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };
    case MoneyActionTypes.ADD_ITEM:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        loading: false,
      };
    case MoneyActionTypes.UPDATE_ITEM:
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction._id === action.payload._id ? action.payload : transaction
        ),
        loading: false,
      };
    case MoneyActionTypes.REMOVE_ITEM:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
        loading: false,
      };
    case MoneyActionTypes.CLEAR_ITEMS:
      return {
        ...state,
        transactions: [],
        filtered: null,
        error: null,
        current: null,
      };
    case MoneyActionTypes.SET_CURRENT_ITEM:
      return {
        ...state,
        current: action.payload,
      };
    case MoneyActionTypes.CLEAR_CURRENT_ITEM:
      return {
        ...state,
        current: null,
      };
    case MoneyActionTypes.FILTER_ITEM:
      return {
        ...state,
        filtered: state.transactions.filter((transaction) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            transaction.item.match(regex) ||
            transaction.description.match(regex)
          );
        }),
      };
    case MoneyActionTypes.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case MoneyActionTypes.TRANSACTION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default moneyReducer;
