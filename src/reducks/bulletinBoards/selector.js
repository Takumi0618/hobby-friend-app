import { createSelector } from 'reselect';

const boardsSelector = (state) => state.boards;

export const getBoards = createSelector(
  [boardsSelector],
  state => state.list 
)

