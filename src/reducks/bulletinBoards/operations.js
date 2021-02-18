import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase';
import { fetchBoardsAction } from './actions';

const boardsRef = db.collection('bulletinBoards');

export const createBoard = (title, category, memo, image) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      category: category,
      image: image,
      memo: memo,
      title: title,
      updated_at: timestamp
    }

    if (data.title.length > 20) {
      alert('タイトル文字数が20字を超えています。')
      return false
    }

    const ref = boardsRef.doc();
    const id = ref.id;
    data.id = id;
    data.created_at = timestamp;

    return boardsRef.doc(id).set(data)
      .then(() => {
        dispatch(push('/'))
      }).catch((error) => {
        throw new Error(error)
      })
  }
}

export const fetchBoards = (category = "") => {
  return async (dispatch) => {
    let query = boardsRef.orderBy('updated_at', 'desc');
    query = (category !== "") ? query.where('category', '==', category) : query;

    query.get()
      .then(snapshots => {
        const boardList = [];
        snapshots.forEach(snapshot => {
          const board = snapshot.data();
          boardList.push(board)
        })

        dispatch(fetchBoardsAction(boardList))
      })
  }
}

export const searchKeyword = (keyword) => {
  return async (dispatch) => {
    let query = boardsRef.orderBy('updated_at', 'desc');

    query.get()
      .then(snapshots => {
        const boardList = [];
        snapshots.forEach(snapshot => {
          const board = snapshot.data();
          if (board.title.indexOf(keyword) >= 0) {
            boardList.push(board)
          }
        })

        dispatch(fetchBoardsAction(boardList))
      })
    
  }
}