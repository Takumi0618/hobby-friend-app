import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getFriends = createSelector(
  [usersSelector],
  state => state.friends
)

export const getIsSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
)

export const getUserIcon = createSelector(
  [usersSelector],
  state => state.icon
)

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
)

export const getUsername = createSelector(
  [usersSelector],
  state => state.username
)