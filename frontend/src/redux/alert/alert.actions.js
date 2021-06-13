import AlertActionTypes from './alert.types';

export const setAlert = (alert) => ({
  type: AlertActionTypes.SET_ALERT,
  payload: alert,
});

export const removeAlert = (id) => ({
  type: AlertActionTypes.REMOVE_ALERT,
  payload: id,
});
