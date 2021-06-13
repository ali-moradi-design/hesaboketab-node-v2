import { UserActionTypes } from './user.types';
import axios from 'axios';
import setAuthToken from './user.utils';

export const loadingUser = () => async (dispatch) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/api/v1/auth/me');

    dispatch({
      type: UserActionTypes.USER_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: UserActionTypes.AUTH_ERROR,
    });
  }
};

export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/v1/auth/register', formData, config);

    dispatch({
      type: UserActionTypes.REGISTER_SUCCESS,
      payload: res.data,
    });
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res2 = await axios.get('/api/v1/auth/me');

      dispatch({
        type: UserActionTypes.USER_LOADED,
        payload: res2.data.data,
      });
    } catch (err) {
      dispatch({
        type: UserActionTypes.AUTH_ERROR,
      });
    }
  } catch (err) {
    dispatch({
      type: UserActionTypes.REGISTER_FAIL,
      payload: err.response.data.error,
    });
  }
};
export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('api/v1/auth/login', formData, config);

    dispatch({
      type: UserActionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res2 = await axios.get('/api/v1/auth/me');

      dispatch({
        type: UserActionTypes.USER_LOADED,
        payload: res2.data.data,
      });
    } catch (err) {
      dispatch({
        type: UserActionTypes.AUTH_ERROR,
      });
    }
  } catch (err) {
    dispatch({
      type: UserActionTypes.LOGIN_FAIL,
      payload: err.response.data.error,
    });
  }
};

export const logout = () => ({
  type: UserActionTypes.LOGOUT,
});
export const clearErrors = () => ({
  type: UserActionTypes.CLEAR_ERRORS,
});
