import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectUserError = createSelector(
  [selectUser],
  (user) => user.error
);
export const selectUserAuthenticated = createSelector(
  [selectUser],
  (user) => user.isAuthenticated
);

export const selectUserLoading = createSelector(
  [selectUser],
  (user) => user.loading
);
