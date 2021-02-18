import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoardCard, BoardNav } from '../components/boards'
import { fetchBoards } from '../reducks/bulletinBoards/operations';
import { getBoards } from '../reducks/bulletinBoards/selector';

const BoardList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const boards = getBoards(selector);

  const query = selector.router.location.search;
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";

  useEffect(() => {
    dispatch(fetchBoards(category))
  }, [query])

  
  return (
    <section className="c-section-wrapin">
      <BoardNav />
      <div className="p-grid__row">
        {boards.length > 0 && (
          boards.map(board => (
            <BoardCard key={board.id} title={board.title} image={board.image} updated_at={board.updated_at} memo={board.memo} category={board.category}/>
          ))
        )}
      </div>
    </section>
  )
}

export default BoardList;