import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import moneyReducer from './money/money.reducer';
import userReducer from './user/user.reducer';
import alertReducer from './alert/alert.reducer';

const rootReducer = combineReducers({
  money: moneyReducer,
  user: userReducer,
  alert: alertReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
