import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoardCard } from '../components/boards'
import { fetchBoards } from '../reducks/bulletinBoards/operations';
import { getBoards } from '../reducks/bulletinBoards/selector';

const BoardList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const boards = getBoards(selector);

  useEffect(() => {
    dispatch(fetchBoards())
  })

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {boards.length > 0 && (
          boards.map(board => (
            <BoardCard key />
        ))
        )

        }
      </div>
    </section>
  )
}

export default BoardList;