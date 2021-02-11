import * as Actions from './actions';
import initialState from '../store/initialState';

export const BoardsReducer = (state = initialState.boards, action) => {
  switch (action.type) {
    case Actions.FETCH_BOARDS:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state
  }
}