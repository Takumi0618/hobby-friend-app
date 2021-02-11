export const FETCH_BOARDS = "FETCH_BOARDS";
export const fetchBoardsAction = (boards) => {
  return {
    type: "FETCH_BOARDS",
    payload: boards
  }
}

