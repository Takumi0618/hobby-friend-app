export const FETCH_BOARDS = "FETCH_BOARDS";
export const fetchBoardsAction = (boards) => {
  return {
    type: "FETCH_BOARDS",
    payload: boards
  }
}

export const FETCH_BOARD_MESSAGES = "FETCH_BOARD_MESSAGES";
export const fetchMessagesAction = (messages) => {
  return {
    type: "FETCH_BOARD_MESSAGES",
    payload: messages
  }
}

