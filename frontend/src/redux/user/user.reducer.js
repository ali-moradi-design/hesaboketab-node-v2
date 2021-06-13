import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  error: null,
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        currentUser: action.payload,
      };
    case UserActionTypes.REGISTER_SUCCESS:
    case UserActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case UserActionTypes.REGISTER_FAIL:
    // case UserActionTypes.AUTH_ERROR:
    case UserActionTypes.LOGIN_FAIL:
    case UserActionTypes.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        currentUser: null,
        error: action.payload,
      };
    case UserActionTypes.AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        currentUser: null,
      };
    case UserActionTypes.CLEAR_ERRORS:
      localStorage.removeItem('token');
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
