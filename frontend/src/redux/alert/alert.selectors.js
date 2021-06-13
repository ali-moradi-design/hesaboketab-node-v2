import { createSelector } from 'reselect';

const selectAlert = (state) => state.alert;

export const selectAlertAlerts = createSelector(
  [selectAlert],
  (alert) => alert.alerts
);
