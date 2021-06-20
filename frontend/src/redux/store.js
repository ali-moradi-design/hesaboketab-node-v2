import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from './user/user.reducer';

import {
  transactionListReducer,
  transactionFilterdListReducer,
  transactionDetailsReducer,
  transactionDeleteReducer,
  transactionCreateReducer,
  transactionUpdateReducer,
} from './transaction/transactions.reducer';

const rootReducer = combineReducers({
  transactionList: transactionListReducer,
  transactionFilterdList: transactionFilterdListReducer,
  transactionDetails: transactionDetailsReducer,
  transactionDelete: transactionDeleteReducer,
  transactionCreate: transactionCreateReducer,
  transactionUpdate: transactionUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
