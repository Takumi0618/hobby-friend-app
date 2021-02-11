import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase';
import { fetchBoardsAction } from './actions';

const boardsRef = db.collection('bulletinBoards');

export const fetchBoards = () => {
  return async (dispatch) => {
    boardsRef.orderBy('updated_at', 'desc').get()
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