import { createSelector } from 'reselect';

const userSelector = (state) => state.users;

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
)