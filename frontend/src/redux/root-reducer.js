import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import moneyReducer from './money/money.reducer';
import userReducer from './user/user.reducer';
import alertReducer from './alert/alert.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['money'],
};

const rootReducer = combineReducers({
  money: moneyReducer,
  user: userReducer,
  alert: alertReducer,
});

export default persistReducer(persistConfig, rootReducer);
