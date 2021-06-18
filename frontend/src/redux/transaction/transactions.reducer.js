import {
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_LIST_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
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
      };
    case TRANSACTION_LIST_FAIL:
      return { loading: false, error: action.payload };
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

// const moneyReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case MoneyActionTypes.GET_ITEMS:
//       return {
//         ...state,
//         transactions: action.payload,
//         loading: false,
//       };
//     case MoneyActionTypes.ADD_ITEM:
//       return {
//         ...state,
//         transactions: [action.payload, ...state.transactions],
//         loading: false,
//       };
//     case MoneyActionTypes.UPDATE_ITEM:
//       return {
//         ...state,
//         transactions: state.transactions.map((transaction) =>
//           transaction._id === action.payload._id ? action.payload : transaction
//         ),
//         loading: false,
//       };
//     case MoneyActionTypes.REMOVE_ITEM:
//       return {
//         ...state,
//         transactions: state.transactions.filter(
//           (transaction) => transaction._id !== action.payload
//         ),
//         loading: false,
//       };
//     case MoneyActionTypes.CLEAR_ITEMS:
//       return {
//         ...state,
//         transactions: [],
//         filtered: null,
//         error: null,
//         current: null,
//       };
//     case MoneyActionTypes.SET_CURRENT_ITEM:
//       return {
//         ...state,
//         current: action.payload,
//       };
//     case MoneyActionTypes.CLEAR_CURRENT_ITEM:
//       return {
//         ...state,
//         current: null,
//       };
//     case MoneyActionTypes.FILTER_ITEM:
//       return {
//         ...state,
//         filtered: state.transactions.filter((transaction) => {
//           const regex = new RegExp(`${action.payload}`, 'gi');
//           return (
//             transaction.item.match(regex) ||
//             transaction.description.match(regex)
//           );
//         }),
//       };
//     case MoneyActionTypes.CLEAR_FILTER:
//       return {
//         ...state,
//         filtered: null,
//       };
//     case MoneyActionTypes.TRANSACTION_ERROR:
//       return {
//         ...state,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default moneyReducer;
